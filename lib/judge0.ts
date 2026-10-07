// JDoodle API helper — compiles and runs Java code
// Docs: https://docs.jdoodle.com/compiler-api/
// JDoodle offers 200 free credits/day and requires NO CREDIT CARD.

export interface RunResult {
  stdout: string;
  stderr: string;
  compile_output: string;
  status: string;
  time: string;
}

export async function runJavaBatch(
  sourceCode: string,
  stdins: string[]
): Promise<RunResult[]> {
  const clientId = process.env.JDOODLE_CLIENT_ID;
  const clientSecret = process.env.JDOODLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing JDoodle API credentials. Please get free ones from jdoodle.com and add JDOODLE_CLIENT_ID and JDOODLE_CLIENT_SECRET to .env.local");
  }

  // To run all test cases in ONE API call (saving credits), we wrap the user's code.
  // We strip 'public' from their class to allow our Wrapper to be the main class.
  const modifiedSource = sourceCode.replace(/(?:public\s+)?class\s+Main/g, "class UserMain");

  // Create standard input strings encoded to avoid escaping issues in generated Java
  const stdinArrayJava = stdins
    .map(s => `new String(java.util.Base64.getDecoder().decode("${Buffer.from(s).toString("base64")}"))`)
    .join(", ");

  const wrapperCode = `
import java.io.*;
import java.util.*;

${modifiedSource}

public class Main {
    public static void main(String[] args) {
        try {
            String[] stdins = new String[] { ${stdinArrayJava} };
            for (int i = 0; i < stdins.length; i++) {
                System.out.println("---JDOODLE_TEST_START_" + i + "---");
                ByteArrayInputStream in = new ByteArrayInputStream(stdins[i].getBytes("UTF-8"));
                System.setIn(in);
                
                try {
                    UserMain.main(new String[0]);
                } catch (Exception e) {
                    e.printStackTrace(System.out);
                }
                
                System.out.println("\\n---JDOODLE_TEST_END_" + i + "---");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
  `;

  const response = await fetch("https://api.jdoodle.com/v1/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId,
      clientSecret,
      script: wrapperCode,
      language: "java",
      versionIndex: "4", // JDK 17
    }),
  });

  if (!response.ok) {
    if (response.status === 429) throw new Error("Daily JDoodle API limit reached.");
    throw new Error(`JDoodle API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error);
  }

  const output = data.output || "";
  
  // If there's a compilation error, it usually won't contain our start tags
  if (!output.includes("---JDOODLE_TEST_START_0---")) {
    return stdins.map(() => ({
      stdout: "",
      stderr: "",
      compile_output: output,
      status: "Compilation Error",
      time: data.cpuTime || "0s",
    }));
  }

  // Parse the combined output into individual test case outputs
  const results: RunResult[] = [];
  
  for (let i = 0; i < stdins.length; i++) {
    const startTag = `---JDOODLE_TEST_START_${i}---`;
    const endTag = `\n---JDOODLE_TEST_END_${i}---`;
    
    const startIndex = output.indexOf(startTag);
    const endIndex = output.indexOf(endTag, startIndex);
    
    if (startIndex !== -1 && endIndex !== -1) {
      // Extract what the user's program printed, ignoring our newline padding
      const rawOut = output.substring(startIndex + startTag.length, endIndex).replace(/^\n/, "");
      results.push({
        stdout: rawOut,
        stderr: "", // JDoodle merges stderr into output usually
        compile_output: "",
        status: "Accepted",
        time: data.cpuTime || "0s",
      });
    } else {
      results.push({
        stdout: "",
        stderr: "Runtime Error or infinite loop prevented output completion.",
        compile_output: "",
        status: "Error",
        time: data.cpuTime || "0s",
      });
    }
  }

  return results;
}
