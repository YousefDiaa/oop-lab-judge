export interface RunResult {
  stdout: string;
  stderr: string;
  compile_output: string;
  status: string;
  time: string;
}

export async function runJavaGodbolt(
  sourceCode: string,
  stdins: string[]
): Promise<RunResult[]> {
  // Strip 'public' from their class to allow our Wrapper to be the main class.
  // Godbolt names the file example.java, so 'public class Main' would cause a compilation error.
  const modifiedSource = sourceCode.replace(/(?:public\s+)?class\s+Main/g, "class UserMain");

  // Create standard input strings encoded to avoid escaping issues in generated Java
  const stdinArrayJava = stdins
    .map(s => `new String(java.util.Base64.getDecoder().decode("${btoa(s)}"))`)
    .join(", ");

  const wrapperCode = `
import java.io.*;
import java.util.*;

${modifiedSource}

class Main {
    public static void main(String[] args) {
        try {
            String[] stdins = new String[] { ${stdinArrayJava} };
            for (int i = 0; i < stdins.length; i++) {
                System.out.println("---GODBOLT_TEST_START_" + i + "---");
                ByteArrayInputStream in = new ByteArrayInputStream(stdins[i].getBytes("UTF-8"));
                System.setIn(in);
                
                try {
                    UserMain.main(new String[0]);
                } catch (Exception e) {
                    e.printStackTrace(System.out);
                }
                
                System.out.println("\\n---GODBOLT_TEST_END_" + i + "---");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
  `;

  const response = await fetch("https://godbolt.org/api/compiler/java2100/compile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      source: wrapperCode,
      options: {
        userArguments: "",
        executeParameters: { args: [], stdin: "" },
        compilerOptions: { executorRequest: true }
      }
    }),
  });

  if (!response.ok) {
    if (response.status === 429) throw new Error("Rate limit exceeded for your IP. Please try again later.");
    throw new Error(`Execution error: ${response.status}`);
  }

  const data = await response.json();
  
  // Format compilation errors
  const compileErrors = (data.buildResult?.stderr || [])
    .map((e: any) => e.text)
    .join("\n");
    
  if (data.buildResult?.code !== 0) {
    return stdins.map(() => ({
      stdout: "",
      stderr: "",
      compile_output: compileErrors,
      status: "Compilation Error",
      time: "0s",
    }));
  }

  // Format runtime output
  const output = (data.stdout || []).map((o: any) => o.text).join("\n");
  const stderrOutput = (data.stderr || []).map((e: any) => e.text).join("\n");
  
  // Parse the combined output into individual test case outputs
  const results: RunResult[] = [];
  
  for (let i = 0; i < stdins.length; i++) {
    const startTag = `---GODBOLT_TEST_START_${i}---`;
    const endTag = `\n---GODBOLT_TEST_END_${i}---`;
    
    const startIndex = output.indexOf(startTag);
    const endIndex = output.indexOf(endTag, startIndex);
    
    if (startIndex !== -1 && endIndex !== -1) {
      const rawOut = output.substring(startIndex + startTag.length, endIndex).replace(/^\n/, "");
      results.push({
        stdout: rawOut,
        stderr: stderrOutput, 
        compile_output: "",
        status: "Accepted",
        time: data.execTime ? `${data.execTime}ms` : "0s",
      });
    } else {
      results.push({
        stdout: "",
        stderr: "Runtime Error or infinite loop prevented output completion.\n" + stderrOutput,
        compile_output: "",
        status: "Error",
        time: data.execTime ? `${data.execTime}ms` : "0s",
      });
    }
  }

  return results;
}
