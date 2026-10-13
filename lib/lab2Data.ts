import { TestCase } from "./testCases";

export interface Lab2Task {
  number: number;
  exerciseLabel: string;
  title: string;
  description: string;
  testInput: string;
  expectedOutput: string;
  defaultCode: string;
  testCases: TestCase[];
}

export const LAB2_TASKS: Lab2Task[] = [
  // ────────────────────────────────────────────────────────────
  // Task 1 (Exercise 1 - Part A) — Number Triangle
  // ────────────────────────────────────────────────────────────
  {
    number: 1,
    exerciseLabel: "Exercise 1 (Part A)",
    title: "Pattern 1 — Number Triangle",
    description: `Write a program to display the following pattern using for loops:

1
2 2
3 3 3
4 4 4 4
5 5 5 5 5

Requirements:
- Use nested for loops (outer loop for 5 rows, inner loop for numbers on each row).
- In each row i (from 1 to 5), print the number i repeated i times separated by a space.
- No user input is required (or input is ignored).`,
    testInput: "",
    expectedOutput: "1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5",
    defaultCode: `public class Main {
    public static void main(String[] args) {
        // Write your solution here using for loops

    }
}
`,
    testCases: [
      { id: 1,  label: "Full 5-row pattern (default run)", input: "",  expected: "1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5", checkType: "exact" },
      { id: 2,  label: "Run with input 5",                 input: "5", expected: "1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5", checkType: "exact" },
      { id: 3,  label: "Row 1 contains 1",                 input: "",  expected: "1",                                 checkType: "contains" },
      { id: 4,  label: "Row 2 contains 2 2",               input: "",  expected: "2 2",                               checkType: "contains" },
      { id: 5,  label: "Row 3 contains 3 3 3",             input: "",  expected: "3 3 3",                             checkType: "contains" },
      { id: 6,  label: "Row 4 contains 4 4 4 4",           input: "",  expected: "4 4 4 4",                           checkType: "contains" },
      { id: 7,  label: "Row 5 contains 5 5 5 5 5",         input: "",  expected: "5 5 5 5 5",                         checkType: "contains" },
      { id: 8,  label: "Row 3 & Row 4 sequence",           input: "",  expected: "3 3 3\n4 4 4 4",                    checkType: "contains" },
      { id: 9,  label: "Row 4 & Row 5 sequence",           input: "",  expected: "4 4 4 4\n5 5 5 5 5",                checkType: "contains" },
      { id: 10, label: "Verification of complete triangle",input: "5", expected: "1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5", checkType: "exact" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 2 (Exercise 1 - Part B) — Alphabet Pyramid
  // ────────────────────────────────────────────────────────────
  {
    number: 2,
    exerciseLabel: "Exercise 1 (Part B)",
    title: "Pattern 2 — Alphabet Pyramid",
    description: `Write a program to display the following alphabet pattern using for loops:

        A
      A B
    A B C
  A B C D
A B C D E

Requirements:
- Use nested for loops.
- Print leading spaces before each line to align the pattern as shown.
- Row 1: A
- Row 2: A B
- Row 3: A B C
- Row 4: A B C D
- Row 5: A B C D E`,
    testInput: "",
    expectedOutput: "        A\n      A B\n    A B C\n  A B C D\nA B C D E",
    defaultCode: `public class Main {
    public static void main(String[] args) {
        // Write your solution here using for loops

    }
}
`,
    testCases: [
      { id: 1,  label: "Full pyramid pattern",             input: "",  expected: "        A\n      A B\n    A B C\n  A B C D\nA B C D E", checkType: "exact" },
      { id: 2,  label: "Run with input 5",                 input: "5", expected: "        A\n      A B\n    A B C\n  A B C D\nA B C D E", checkType: "exact" },
      { id: 3,  label: "Row 1 contains A",                 input: "",  expected: "A",                                                 checkType: "contains" },
      { id: 4,  label: "Row 2 contains A B",               input: "",  expected: "A B",                                               checkType: "contains" },
      { id: 5,  label: "Row 3 contains A B C",             input: "",  expected: "A B C",                                             checkType: "contains" },
      { id: 6,  label: "Row 4 contains A B C D",           input: "",  expected: "A B C D",                                           checkType: "contains" },
      { id: 7,  label: "Row 5 contains A B C D E",         input: "",  expected: "A B C D E",                                         checkType: "contains" },
      { id: 8,  label: "Row 3 & Row 4 sequence",           input: "",  expected: "A B C\n  A B C D || A B C\nA B C D",               checkType: "contains" },
      { id: 9,  label: "Row 4 & Row 5 sequence",           input: "",  expected: "A B C D\nA B C D E",                                checkType: "contains" },
      { id: 10, label: "Pyramid verification",             input: "5", expected: "A B C D E",                                         checkType: "contains" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 3 (Exercise 2) — 4-Digit ID Encryption
  // ────────────────────────────────────────────────────────────
  {
    number: 3,
    exerciseLabel: "Exercise 2",
    title: "4-Digit ID Encryption",
    description: `Write a program that encrypts a 4-digit ID number as follows:
  a. Replace each digit by (the sum of that digit plus 7) modulus 10.
  b. Swap the first digit with the third.
  c. Swap the second digit with the fourth.

Example (Input: 1234):
- Digits: 1, 2, 3, 4
- Step a:
    (1 + 7) % 10 = 8
    (2 + 7) % 10 = 9
    (3 + 7) % 10 = 0
    (4 + 7) % 10 = 1
    → 8, 9, 0, 1
- Step b (swap 1st & 3rd): 0, 9, 8, 1
- Step c (swap 2nd & 4th): 0, 1, 8, 9
- Encrypted ID: 0189

Sample Input:
1234

Sample Output:
0189`,
    testInput: "1234",
    expectedOutput: "0189",
    defaultCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Write your solution here

    }
}
`,
    testCases: [
      { id: 1,  label: "1234 → 0189",  input: "1234", expected: "0189 || 0 1 8 9 || 189",  checkType: "contains" },
      { id: 2,  label: "4567 → 3412",  input: "4567", expected: "3412 || 3 4 1 2",          checkType: "contains" },
      { id: 3,  label: "0000 → 7777",  input: "0000", expected: "7777 || 7 7 7 7",          checkType: "contains" },
      { id: 4,  label: "9999 → 6666",  input: "9999", expected: "6666 || 6 6 6 6",          checkType: "contains" },
      { id: 5,  label: "5821 → 9825",  input: "5821", expected: "9825 || 9 8 2 5",          checkType: "contains" },
      { id: 6,  label: "3719 → 8604",  input: "3719", expected: "8604 || 8 6 0 4",          checkType: "contains" },
      { id: 7,  label: "1000 → 7787",  input: "1000", expected: "7787 || 7 7 8 7",          checkType: "contains" },
      { id: 8,  label: "2468 → 3591",  input: "2468", expected: "3591 || 3 5 9 1",          checkType: "contains" },
      { id: 9,  label: "7777 → 4444",  input: "7777", expected: "4444 || 4 4 4 4",          checkType: "contains" },
      { id: 10, label: "1357 → 2480",  input: "1357", expected: "2480 || 2 4 8 0",          checkType: "contains" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 4 (Exercise 3) — Calculate e (calc_e Method)
  // ────────────────────────────────────────────────────────────
  {
    number: 4,
    exerciseLabel: "Exercise 3",
    title: "Calculate e (calc_e Method)",
    description: `Write a program that declares a method called calc_e(int) to calculate the value of e as follows:

    e = 1 + 1 / 1! + 1 / 2! + 1 / 3! + ... + 1 / n!

Requirements:
- Declare a method:
    public static double calc_e(int n)
- In the main method, read an integer n using Scanner, call calc_e(n), and print the calculated value.
- Note: Use double division (e.g. 1.0 / factorial) so precision is maintained.

Sample Input:
5

Sample Output:
2.7166666666666663`,
    testInput: "5",
    expectedOutput: "2.7166666666666663",
    defaultCode: `import java.util.Scanner;

public class Main {
    // Declare the calc_e method
    public static double calc_e(int n) {
        // Write your method body here
        return 0.0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Write your solution here

    }
}
`,
    testCases: [
      { id: 1,  label: "n = 1 → 2.0",            input: "1",  expected: "2.0 || 2",      checkType: "contains" },
      { id: 2,  label: "n = 2 → 2.5",            input: "2",  expected: "2.5",           checkType: "contains" },
      { id: 3,  label: "n = 3 → 2.6667",         input: "3",  expected: "2.66 || 2.67",  checkType: "contains" },
      { id: 4,  label: "n = 4 → 2.7083",         input: "4",  expected: "2.70 || 2.71",  checkType: "contains" },
      { id: 5,  label: "n = 5 → 2.7167",         input: "5",  expected: "2.716 || 2.717",checkType: "contains" },
      { id: 6,  label: "n = 6 → 2.7180",         input: "6",  expected: "2.718",         checkType: "contains" },
      { id: 7,  label: "n = 7 → 2.7182",         input: "7",  expected: "2.718",         checkType: "contains" },
      { id: 8,  label: "n = 8 → 2.71827",        input: "8",  expected: "2.7182",        checkType: "contains" },
      { id: 9,  label: "n = 10 → 2.71828",       input: "10", expected: "2.71828",       checkType: "contains" },
      { id: 10, label: "n = 12 → 2.71828",       input: "12", expected: "2.71828",       checkType: "contains" },
    ],
  },
];
