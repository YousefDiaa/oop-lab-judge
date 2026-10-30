import { TestCase } from "./testCases";

export interface Lab2Task {
  number: number;
  exerciseLabel: string;
  category: string;
  title: string;
  description: string;
  sampleRun: string;
  testInput: string;
  expectedOutput: string;
  defaultCode: string;
  testCases: TestCase[];
}

export const LAB2_TASKS: Lab2Task[] = [
  // ────────────────────────────────────────────────────────────
  // Task 1 — Library Book (Encapsulation)
  // ────────────────────────────────────────────────────────────
  {
    number: 1,
    exerciseLabel: "Task 1",
    category: "Encapsulation",
    title: "Library Book",
    sampleRun: `Clean Code (2 copies)
borrow: true
borrow: true
borrow: false
return -> available: 1`,
    description: `Create a class **Book** with:
- Private fields:
  - \`title\` (\`String\`)
  - \`author\` (\`String\`)
  - \`totalCopies\` (\`int\`)
  - \`availableCopies\` (\`int\`)
- Constructor:
  - Receives \`title\`, \`author\`, and \`totalCopies\`.
  - If \`totalCopies < 1\`, use \`1\`.
  - Initially, \`availableCopies\` equals \`totalCopies\`.
- Getters:
  - \`getTitle()\`, \`getAuthor()\`, \`getTotalCopies()\`, \`getAvailableCopies()\`.
  - \`title\` and \`author\` have getters only (no setters).
- Methods:
  - \`borrowBook()\`: Lowers \`availableCopies\` by 1 and returns \`true\`, or returns \`false\` when no copy is available (can never be negative).
  - \`returnBook()\`: Raises \`availableCopies\` by 1, but never above \`totalCopies\`. Does nothing when all copies are already in.

Test all cases in \`main\` as shown in the Sample Run.`,
    testInput: "",
    expectedOutput: `Clean Code (2 copies)
borrow: true
borrow: true
borrow: false
return -> available: 1`,
    defaultCode: `class Book {
    // Declare private fields: title, author, totalCopies, availableCopies

    // Constructor: receives title, author, totalCopies (use 1 if totalCopies < 1)
    public Book(String title, String author, int totalCopies) {
        // Write your code here
    }

    // Getters for title, author, totalCopies, availableCopies

    // borrowBook(): decreases availableCopies if available and returns true, else false
    public boolean borrowBook() {
        // Write your code here
        return false;
    }

    // returnBook(): increases availableCopies but not above totalCopies
    public void returnBook() {
        // Write your code here
    }
}

public class Main {
    public static void main(String[] args) {
        // Test all cases in main matching the Sample Run

    }
}
`,
    testCases: [
      { id: 1,  label: "Book title & total copies",        input: "", expected: "Clean Code (2 copies) || Clean Code", checkType: "contains" },
      { id: 2,  label: "First borrow (true)",              input: "", expected: "borrow: true || true",                checkType: "contains" },
      { id: 3,  label: "Second borrow (true)",             input: "", expected: "borrow: true || true",                checkType: "contains" },
      { id: 4,  label: "Third borrow rejected (false)",    input: "", expected: "borrow: false || false",              checkType: "contains" },
      { id: 5,  label: "Return book increases available",  input: "", expected: "return -> available: 1 || available: 1 || availableCopies: 1", checkType: "contains" },
      { id: 6,  label: "Title getter verification",        input: "", expected: "Clean Code",                          checkType: "contains" },
      { id: 7,  label: "Available copy count check",       input: "", expected: "1",                                   checkType: "contains" },
      { id: 8,  label: "Copies text formatted",            input: "", expected: "2 copies || copies",                  checkType: "contains" },
      { id: 9,  label: "Borrow sequence check",            input: "", expected: "true\nborrow: false || true\nfalse", checkType: "contains" },
      { id: 10, label: "Full sample run verification",     input: "", expected: "available: 1",                        checkType: "contains" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 2 — Temperature (Computed Getters)
  // ────────────────────────────────────────────────────────────
  {
    number: 2,
    exerciseLabel: "Task 2",
    category: "Computed Getters",
    title: "Temperature",
    sampleRun: `Celsius: 25.0
Fahrenheit: 77.0
Kelvin: 298.15
Invalid temperature`,
    description: `Create a class **Temperature** that stores only the Celsius value:
- Private field:
  - \`celsius\` (\`double\`)
- Method \`setCelsius(double celsius)\`:
  - Rejects values below \`-273.15\` (absolute zero) and prints \`"Invalid temperature"\`.
- Getters:
  - \`getCelsius()\`: returns the Celsius value.
  - \`getFahrenheit()\`: calculated as \`celsius * 9.0 / 5.0 + 32\` (do not store in a field!).
  - \`getKelvin()\`: calculated as \`celsius + 273.15\` (do not store in a field!).
- Constructor:
  - Must call \`setCelsius\`.

Requirements:
- Only one field: \`celsius\`.
- Formulas: $F = C \\times 9/5 + 32$ and $K = C + 273.15$.
- Watch out: Use \`9.0 / 5.0\` because \`9 / 5\` is 1 in integer division.`,
    testInput: "",
    expectedOutput: `Celsius: 25.0
Fahrenheit: 77.0
Kelvin: 298.15
Invalid temperature`,
    defaultCode: `class Temperature {
    // Declare private field: celsius

    // Constructor: must use setCelsius
    public Temperature(double celsius) {
        // Write your code here
    }

    // setCelsius: reject values below -273.15 and print "Invalid temperature"
    public void setCelsius(double celsius) {
        // Write your code here
    }

    // getCelsius(): returns celsius
    public double getCelsius() {
        // Write your code here
        return 0.0;
    }

    // getFahrenheit(): calculated as C * 9.0 / 5.0 + 32
    public double getFahrenheit() {
        // Write your code here
        return 0.0;
    }

    // getKelvin(): calculated as C + 273.15
    public double getKelvin() {
        // Write your code here
        return 0.0;
    }
}

public class Main {
    public static void main(String[] args) {
        // Test all cases in main matching the Sample Run

    }
}
`,
    testCases: [
      { id: 1,  label: "Celsius output (25.0)",             input: "", expected: "Celsius: 25.0 || 25.0",               checkType: "contains" },
      { id: 2,  label: "Fahrenheit calculated (77.0)",      input: "", expected: "Fahrenheit: 77.0 || 77.0 || 77",       checkType: "contains" },
      { id: 3,  label: "Kelvin calculated (298.15)",        input: "", expected: "Kelvin: 298.15 || 298.15",            checkType: "contains" },
      { id: 4,  label: "Validation message on -300",        input: "", expected: "Invalid temperature",                 checkType: "contains" },
      { id: 5,  label: "Celsius value 25",                  input: "", expected: "25",                                  checkType: "contains" },
      { id: 6,  label: "Fahrenheit value 77",               input: "", expected: "77",                                  checkType: "contains" },
      { id: 7,  label: "Kelvin value 298.15",               input: "", expected: "298.15",                              checkType: "contains" },
      { id: 8,  label: "Rejection check",                   input: "", expected: "Invalid",                             checkType: "contains" },
      { id: 9,  label: "Celsius to Fahrenheit check",       input: "", expected: "Celsius: 25.0 || Fahrenheit: 77.0",   checkType: "contains" },
      { id: 10, label: "Complete sample run output",        input: "", expected: "Invalid temperature",                 checkType: "contains" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 3 — Rectangle Counter (Validation + Static)
  // ────────────────────────────────────────────────────────────
  {
    number: 3,
    exerciseLabel: "Task 3",
    category: "Validation + Static",
    title: "Rectangle Counter",
    sampleRun: `Area: 24.0
Perimeter: 20.0
Is square: false
setWidth (-3) rejected, width is 6.0
Square? true
Rectangles created: 2`,
    description: `Create a class **Rectangle** with:
- Private fields:
  - \`width\` (\`double\`)
  - \`height\` (\`double\`)
  - \`static int count = 0\` (records how many \`Rectangle\` objects have been created)
- Setters:
  - \`setWidth(double width)\`: rejects values $\\le 0$ and prints \`setWidth (<val>) rejected, width is <current>\`.
  - \`setHeight(double height)\`: rejects values $\\le 0$.
- Constructor:
  - Reuses the setters and increments the static counter \`count\`.
- Methods:
  - \`getArea()\`: returns \`width * height\`
  - \`getPerimeter()\`: returns \`2 * (width + height)\`
  - \`isSquare()\`: returns \`true\` if width equals height, otherwise \`false\`
  - \`static int getCount()\`: returns the number of created rectangles.

In \`main\`:
- Create a $6 \\times 4$ rectangle and test area, perimeter, and isSquare.
- Test setting invalid width \`-3\`.
- Create a $5 \\times 5$ rectangle and test isSquare.
- Print the total rectangles created using \`Rectangle.getCount()\`.`,
    testInput: "",
    expectedOutput: `Area: 24.0
Perimeter: 20.0
Is square: false
setWidth (-3) rejected, width is 6.0
Square? true
Rectangles created: 2`,
    defaultCode: `class Rectangle {
    // Declare private fields: width, height, and private static count

    // Constructor: reuses setters and increments static count
    public Rectangle(double width, double height) {
        // Write your code here
    }

    // setWidth: reject <= 0 and print rejection message
    public void setWidth(double width) {
        // Write your code here
    }

    // setHeight: reject <= 0
    public void setHeight(double height) {
        // Write your code here
    }

    public double getWidth() {
        return 0.0;
    }

    public double getHeight() {
        return 0.0;
    }

    public double getArea() {
        // Write your code here
        return 0.0;
    }

    public double getPerimeter() {
        // Write your code here
        return 0.0;
    }

    public boolean isSquare() {
        // Write your code here
        return false;
    }

    public static int getCount() {
        // Write your code here
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        // Test all cases in main matching the Sample Run

    }
}
`,
    testCases: [
      { id: 1,  label: "Area of 6x4 (24.0)",                 input: "", expected: "Area: 24.0 || 24.0 || 24",              checkType: "contains" },
      { id: 2,  label: "Perimeter of 6x4 (20.0)",          input: "", expected: "Perimeter: 20.0 || 20.0 || 20",          checkType: "contains" },
      { id: 3,  label: "Is square false for 6x4",           input: "", expected: "Is square: false || false",             checkType: "contains" },
      { id: 4,  label: "Rejection of negative width (-3)",  input: "", expected: "rejected || width is 6.0",              checkType: "contains" },
      { id: 5,  label: "Is square true for 5x5",            input: "", expected: "Square? true || true",                  checkType: "contains" },
      { id: 6,  label: "Static count equals 2",             input: "", expected: "Rectangles created: 2 || 2",            checkType: "contains" },
      { id: 7,  label: "Area value 24",                     input: "", expected: "24",                                    checkType: "contains" },
      { id: 8,  label: "Perimeter value 20",                input: "", expected: "20",                                    checkType: "contains" },
      { id: 9,  label: "Validation message format",         input: "", expected: "setWidth (-3) rejected || rejected",    checkType: "contains" },
      { id: 10, label: "Final static count check",          input: "", expected: "2",                                     checkType: "contains" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 4 — Password Strength (String + Character)
  // ────────────────────────────────────────────────────────────
  {
    number: 4,
    exerciseLabel: "Task 4",
    category: "String + Character",
    title: "Password Strength",
    sampleRun: `Enter password: java2026
Missing: uppercase letter, symbol
Score: 3/5
Medium`,
    description: `Read a password and award **1 point** for each satisfied rule:
1. At least 8 characters long
2. Contains an uppercase letter (\`Character.isUpperCase\`)
3. Contains a lowercase letter (\`Character.isLowerCase\`)
4. Contains a digit (\`Character.isDigit\`)
5. Contains a symbol (any character where \`!Character.isLetterOrDigit(c)\`)

Print:
- The missing rules (e.g. \`Missing: uppercase letter, symbol\`)
- The score: \`Score: <score>/5\`
- The rating based on score:
  - **0–2**: \`Weak\`
  - **3–4**: \`Medium\`
  - **5**: \`Strong\`

Requirements:
- Loop over the characters using \`charAt\`
- Use boolean variables for each rule
- Use \`Character.isUpperCase\`, \`isLowerCase\`, \`isDigit\``,
    testInput: "java2026",
    expectedOutput: `Score: 3/5
Medium`,
    defaultCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Write your solution here

    }
}
`,
    testCases: [
      { id: 1,  label: "java2026 (length, lower, digit) → Medium",       input: "java2026",       expected: "Score: 3/5 || Medium", checkType: "contains" },
      { id: 2,  label: "P@ssw0rd2026! (all 5 rules) → Strong",           input: "P@ssw0rd2026!",  expected: "Score: 5/5 || Strong", checkType: "contains" },
      { id: 3,  label: "abc (short, lower only) → Weak",                 input: "abc",            expected: "Score: 1/5 || Weak",   checkType: "contains" },
      { id: 4,  label: "12345678 (length, digits only) → Weak",          input: "12345678",       expected: "Score: 2/5 || Weak",   checkType: "contains" },
      { id: 5,  label: "Password1 (len, upper, lower, digit) → Medium",  input: "Password1",      expected: "Score: 4/5 || Medium", checkType: "contains" },
      { id: 6,  label: "Secret! (len, upper, lower, symbol) → Medium",   input: "Secret!",        expected: "Score: 4/5 || Score: 3/5 || Medium", checkType: "contains" },
      { id: 7,  label: "HelloWorld! (len, upper, lower, symbol) → Medium",input: "HelloWorld!",  expected: "Score: 4/5 || Medium", checkType: "contains" },
      { id: 8,  label: "admin#2024 (len, lower, digit, symbol) → Medium", input: "admin#2024",   expected: "Score: 4/5 || Medium", checkType: "contains" },
      { id: 9,  label: "A1! (upper, digit, symbol, short) → Medium",     input: "A1!",            expected: "Score: 3/5 || Medium", checkType: "contains" },
      { id: 10, label: "SuperSecure#99 (all 5 rules) → Strong",          input: "SuperSecure#99", expected: "Score: 5/5 || Strong", checkType: "contains" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 5 — Caesar Cipher (Char Arithmetic)
  // ────────────────────────────────────────────────────────────
  {
    number: 5,
    exerciseLabel: "Task 5",
    category: "Char Arithmetic",
    title: "Caesar Cipher",
    sampleRun: `Enter text: Hello, World!
Enter shift: 3
Encrypted: Khoor, Zruog!`,
    description: `Read a sentence and a shift value $k$ ($1$ to $25$) using \`Scanner\`.
Encrypt the sentence by moving every letter $k$ positions forward in the alphabet, wrapping from Z back to A:
- Keep the case of each letter (uppercase stays uppercase, lowercase stays lowercase).
- Leave spaces, digits, and punctuation unchanged.
- Wrap around with the \`%\` operator:
  - Upper: \`(char) ('A' + (c - 'A' + k) % 26)\`
  - Lower: \`(char) ('a' + (c - 'a' + k) % 26)\`
- Build and print the result with a \`StringBuilder\`.`,
    testInput: "Hello, World!\n3",
    expectedOutput: "Khoor, Zruog!",
    defaultCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Write your solution here

    }
}
`,
    testCases: [
      { id: 1,  label: "Hello, World! with shift 3",          input: "Hello, World!\n3",    expected: "Khoor, Zruog!",     checkType: "contains" },
      { id: 2,  label: "abc with shift 1 → bcd",              input: "abc\n1",              expected: "bcd",               checkType: "contains" },
      { id: 3,  label: "xyz with shift 1 → yza (wrap around)",input: "xyz\n1",              expected: "yza",               checkType: "contains" },
      { id: 4,  label: "XYZ with shift 3 → ABC (wrap around)",input: "XYZ\n3",              expected: "ABC",               checkType: "contains" },
      { id: 5,  label: "Java 2026! with shift 5",             input: "Java 2026!\n5",       expected: "Ofaf 2026!",        checkType: "contains" },
      { id: 6,  label: "Attack at Dawn! with shift 4",        input: "Attack at Dawn!\n4",  expected: "Exxego ex Hear!",   checkType: "contains" },
      { id: 7,  label: "Zebra with shift 1 → Afcsb",          input: "Zebra\n1",            expected: "Afcsb",             checkType: "contains" },
      { id: 8,  label: "Caesar Cipher with shift 13 (ROT13)", input: "Caesar Cipher\n13",   expected: "Pnrfne Pvcure",     checkType: "contains" },
      { id: 9,  label: "Punctuation & numbers preserved",     input: "Keep Case, 123.\n2",  expected: "Mggr Ecug, 123.",   checkType: "contains" },
      { id: 10, label: "Shift 25 wrap around",                input: "A B C\n25",           expected: "Z A B",             checkType: "contains" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 6 — Reverse Words (Split + StringBuilder)
  // ────────────────────────────────────────────────────────────
  {
    number: 6,
    exerciseLabel: "Task 6",
    category: "Split + StringBuilder",
    title: "Reverse Words",
    sampleRun: `Enter sentence: Java is fun
Each word reversed: avaJ si nuf
Words reversed: fun is Java`,
    description: `Read a sentence using \`Scanner\`:
- **Part A**: Print every word reversed, but keep the words in their original order.
- **Part B**: Print the words in reverse order, but keep each word as it is.
- Treat several spaces between words as a single space (\`split("\\\\s+")\`).

Requirements:
- Split the sentence into a \`String\` array.
- Use a \`StringBuilder\` to reverse each word for Part A.
- Use a loop that runs from the last word to the first for Part B.`,
    testInput: "Java is fun",
    expectedOutput: `Each word reversed: avaJ si nuf
Words reversed: fun is Java`,
    defaultCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Write your solution here

    }
}
`,
    testCases: [
      { id: 1,  label: "Java is fun → avaJ si nuf",                input: "Java is fun",                expected: "avaJ si nuf",                 checkType: "contains" },
      { id: 2,  label: "Java is fun → fun is Java",                input: "Java is fun",                expected: "fun is Java",                 checkType: "contains" },
      { id: 3,  label: "Hello World",                              input: "Hello World",                expected: "olleH dlroW || World Hello",  checkType: "contains" },
      { id: 4,  label: "Programming in Java",                      input: "Programming in Java",        expected: "gnimmargorP ni avaJ || Java in Programming", checkType: "contains" },
      { id: 5,  label: "OpenAI ChatGPT",                           input: "OpenAI ChatGPT",             expected: "IAnepO TPGtahC || ChatGPT OpenAI", checkType: "contains" },
      { id: 6,  label: "one two three",                            input: "one two three",              expected: "eno owt eerht || three two one", checkType: "contains" },
      { id: 7,  label: "Multiple spaces handled",                  input: "Multiple   spaces   test",   expected: "elpitluM secaps tset || test spaces Multiple", checkType: "contains" },
      { id: 8,  label: "Palindromes: racecar radar level",         input: "racecar radar level",        expected: "racecar radar level || level radar racecar", checkType: "contains" },
      { id: 9,  label: "Single word: Single",                      input: "Single",                     expected: "elgniS || Single",            checkType: "contains" },
      { id: 10, label: "Sentence: Keep calm and code on",          input: "Keep calm and code on",      expected: "peeK mlac dna edoc no || on code and calm Keep", checkType: "contains" },
    ],
  },
];
