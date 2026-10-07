// All 10 test cases per task
// checkType:
//   "exact"    — normalised stdout must exactly equal expected
//   "contains" — stdout just needs to contain the expected string

export interface TestCase {
  id: number;
  label: string;
  input: string;
  expected: string;
  checkType: "exact" | "contains";
}

export interface TaskTestCases {
  taskNumber: number;
  cases: TestCase[];
}

export const ALL_TEST_CASES: TaskTestCases[] = [
  // ────────────────────────────────────────────────────────────
  // Task 1 — Leap Year
  // ────────────────────────────────────────────────────────────
  {
    taskNumber: 1,
    cases: [
      { id: 1,  label: "2000 (÷400 → leap)",          input: "2000", expected: "Leap year",      checkType: "exact" },
      { id: 2,  label: "1900 (÷100 but not ÷400)",    input: "1900", expected: "Not a leap year", checkType: "exact" },
      { id: 3,  label: "2024 (÷4 → leap)",            input: "2024", expected: "Leap year",      checkType: "exact" },
      { id: 4,  label: "2023 (not ÷4)",               input: "2023", expected: "Not a leap year", checkType: "exact" },
      { id: 5,  label: "1600 (÷400 → leap)",          input: "1600", expected: "Leap year",      checkType: "exact" },
      { id: 6,  label: "1700 (÷100 → not leap)",      input: "1700", expected: "Not a leap year", checkType: "exact" },
      { id: 7,  label: "2100 (÷100 → not leap)",      input: "2100", expected: "Not a leap year", checkType: "exact" },
      { id: 8,  label: "2400 (÷400 → leap)",          input: "2400", expected: "Leap year",      checkType: "exact" },
      { id: 9,  label: "2020 (÷4 → leap)",            input: "2020", expected: "Leap year",      checkType: "exact" },
      { id: 10, label: "2019 (not ÷4 → not leap)",    input: "2019", expected: "Not a leap year", checkType: "exact" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 2 — Largest of Three
  // ────────────────────────────────────────────────────────────
  {
    taskNumber: 2,
    cases: [
      { id: 1,  label: "8 15 3 → 15",          input: "8 15 3",   expected: "Largest: 15",           checkType: "exact" },
      { id: 2,  label: "5 5 5 → all equal",    input: "5 5 5",   expected: "All numbers are equal", checkType: "exact" },
      { id: 3,  label: "3 1 2 → 3",            input: "3 1 2",   expected: "Largest: 3",            checkType: "exact" },
      { id: 4,  label: "1 2 3 → 3",            input: "1 2 3",   expected: "Largest: 3",            checkType: "exact" },
      { id: 5,  label: "-1 -2 -3 → -1",        input: "-1 -2 -3",expected: "Largest: -1",           checkType: "exact" },
      { id: 6,  label: "0 0 0 → all equal",    input: "0 0 0",   expected: "All numbers are equal", checkType: "exact" },
      { id: 7,  label: "100 99 98 → 100",      input: "100 99 98",expected: "Largest: 100",         checkType: "exact" },
      { id: 8,  label: "-5 0 5 → 5",           input: "-5 0 5",  expected: "Largest: 5",            checkType: "exact" },
      { id: 9,  label: "7 7 3 → 7",            input: "7 7 3",   expected: "Largest: 7",            checkType: "exact" },
      { id: 10, label: "10 10 10 → all equal", input: "10 10 10",expected: "All numbers are equal", checkType: "exact" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 3 — Simple ATM
  // Uses "contains" since the program also prints menus/prompts
  // ────────────────────────────────────────────────────────────
  {
    taskNumber: 3,
    cases: [
      { id: 1,  label: "Wrong PIN 9999",           input: "9999",               expected: "Wrong PIN",          checkType: "contains" },
      { id: 2,  label: "Wrong PIN 0000",           input: "0000",               expected: "Wrong PIN",          checkType: "contains" },
      { id: 3,  label: "Withdraw 300 → bal 700",   input: "1234\n2\n300\n3",    expected: "New balance: 700",   checkType: "contains" },
      { id: 4,  label: "Withdraw 500 → bal 500",   input: "1234\n2\n500\n3",    expected: "New balance: 500",   checkType: "contains" },
      { id: 5,  label: "Overdraft → insufficient", input: "1234\n2\n1001\n3",   expected: "Insufficient balance", checkType: "contains" },
      { id: 6,  label: "Withdraw 0 → bal 1000",    input: "1234\n2\n0\n3",      expected: "New balance: 1000",  checkType: "contains" },
      { id: 7,  label: "Withdraw 1000 → bal 0",    input: "1234\n2\n1000\n3",   expected: "New balance: 0",     checkType: "contains" },
      { id: 8,  label: "Withdraw 999 → bal 1",     input: "1234\n2\n999\n3",    expected: "New balance: 1",     checkType: "contains" },
      { id: 9,  label: "Withdraw 200 → bal 800",   input: "1234\n2\n200\n3",    expected: "New balance: 800",   checkType: "contains" },
      { id: 10, label: "Withdraw 100 → bal 900",   input: "1234\n2\n100\n3",    expected: "New balance: 900",   checkType: "contains" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 4 — Star Triangle
  // ────────────────────────────────────────────────────────────
  {
    taskNumber: 4,
    cases: [
      { id: 1,  label: "n=1",  input: "1",  expected: "*",                                                                checkType: "exact" },
      { id: 2,  label: "n=2",  input: "2",  expected: "*\n**",                                                            checkType: "exact" },
      { id: 3,  label: "n=3",  input: "3",  expected: "*\n**\n***",                                                       checkType: "exact" },
      { id: 4,  label: "n=4",  input: "4",  expected: "*\n**\n***\n****",                                                 checkType: "exact" },
      { id: 5,  label: "n=5",  input: "5",  expected: "*\n**\n***\n****\n*****",                                          checkType: "exact" },
      { id: 6,  label: "n=6",  input: "6",  expected: "*\n**\n***\n****\n*****\n******",                                  checkType: "exact" },
      { id: 7,  label: "n=7",  input: "7",  expected: "*\n**\n***\n****\n*****\n******\n*******",                         checkType: "exact" },
      { id: 8,  label: "n=8",  input: "8",  expected: "*\n**\n***\n****\n*****\n******\n*******\n********",               checkType: "exact" },
      { id: 9,  label: "n=9",  input: "9",  expected: "*\n**\n***\n****\n*****\n******\n*******\n********\n*********",    checkType: "exact" },
      { id: 10, label: "n=10", input: "10", expected: "*\n**\n***\n****\n*****\n******\n*******\n********\n*********\n**********", checkType: "exact" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 5 — Factorial
  // ────────────────────────────────────────────────────────────
  {
    taskNumber: 5,
    cases: [
      { id: 1,  label: "0! = 1",            input: "0",   expected: "0! = 1",         checkType: "exact" },
      { id: 2,  label: "1! = 1",            input: "1",   expected: "1! = 1",         checkType: "exact" },
      { id: 3,  label: "2! = 2",            input: "2",   expected: "2! = 2",         checkType: "exact" },
      { id: 4,  label: "3! = 6",            input: "3",   expected: "3! = 6",         checkType: "exact" },
      { id: 5,  label: "4! = 24",           input: "4",   expected: "4! = 24",        checkType: "exact" },
      { id: 6,  label: "5! = 120",          input: "5",   expected: "5! = 120",       checkType: "exact" },
      { id: 7,  label: "6! = 720",          input: "6",   expected: "6! = 720",       checkType: "exact" },
      { id: 8,  label: "7! = 5040",         input: "7",   expected: "7! = 5040",      checkType: "exact" },
      { id: 9,  label: "10! = 3628800",     input: "10",  expected: "10! = 3628800",  checkType: "exact" },
      { id: 10, label: "negative → invalid",input: "-1",  expected: "Invalid input",  checkType: "exact" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 6 — Prime Check
  // ────────────────────────────────────────────────────────────
  {
    taskNumber: 6,
    cases: [
      { id: 1,  label: "2 is prime",       input: "2",   expected: "2 is prime",     checkType: "exact" },
      { id: 2,  label: "3 is prime",       input: "3",   expected: "3 is prime",     checkType: "exact" },
      { id: 3,  label: "4 not prime",      input: "4",   expected: "4 is not prime", checkType: "exact" },
      { id: 4,  label: "7 is prime",       input: "7",   expected: "7 is prime",     checkType: "exact" },
      { id: 5,  label: "9 not prime",      input: "9",   expected: "9 is not prime", checkType: "exact" },
      { id: 6,  label: "11 is prime",      input: "11",  expected: "11 is prime",    checkType: "exact" },
      { id: 7,  label: "17 is prime",      input: "17",  expected: "17 is prime",    checkType: "exact" },
      { id: 8,  label: "21 not prime",     input: "21",  expected: "21 is not prime",checkType: "exact" },
      { id: 9,  label: "97 is prime",      input: "97",  expected: "97 is prime",    checkType: "exact" },
      { id: 10, label: "100 not prime",    input: "100", expected: "100 is not prime",checkType: "exact" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 7 — Reverse & Palindrome
  // ────────────────────────────────────────────────────────────
  {
    taskNumber: 7,
    cases: [
      { id: 1,  label: "121 → palindrome",    input: "121",   expected: "Reversed: 121\nPalindrome",        checkType: "exact" },
      { id: 2,  label: "123 → not palindrome",input: "123",   expected: "Reversed: 321\nNot a palindrome",  checkType: "exact" },
      { id: 3,  label: "1 → palindrome",      input: "1",     expected: "Reversed: 1\nPalindrome",          checkType: "exact" },
      { id: 4,  label: "12321 → palindrome",  input: "12321", expected: "Reversed: 12321\nPalindrome",      checkType: "exact" },
      { id: 5,  label: "12345 → not palindrome",input:"12345",expected: "Reversed: 54321\nNot a palindrome",checkType: "exact" },
      { id: 6,  label: "1001 → palindrome",   input: "1001",  expected: "Reversed: 1001\nPalindrome",       checkType: "exact" },
      { id: 7,  label: "1221 → palindrome",   input: "1221",  expected: "Reversed: 1221\nPalindrome",       checkType: "exact" },
      { id: 8,  label: "1234 → not palindrome",input:"1234",  expected: "Reversed: 4321\nNot a palindrome", checkType: "exact" },
      { id: 9,  label: "11 → palindrome",     input: "11",    expected: "Reversed: 11\nPalindrome",         checkType: "exact" },
      { id: 10, label: "10 → not palindrome", input: "10",    expected: "Reversed: 1\nNot a palindrome",    checkType: "exact" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // Task 8 — FizzBuzz (Part A only auto-tested)
  // Part B (Fibonacci) is required but output varies by format;
  // uses "contains" to check Part A output exists in the combined output.
  // ────────────────────────────────────────────────────────────
  {
    taskNumber: 8,
    cases: [
      { id: 1,  label: "n=1  → 1",                input: "1",  expected: "1",                         checkType: "contains" },
      { id: 2,  label: "n=2  → 1,2",              input: "2",  expected: "1\n2",                       checkType: "contains" },
      { id: 3,  label: "n=3  → Fizz",             input: "3",  expected: "1\n2\nFizz",                 checkType: "contains" },
      { id: 4,  label: "n=5  → Buzz on 5",        input: "5",  expected: "1\n2\nFizz\n4\nBuzz",        checkType: "contains" },
      { id: 5,  label: "n=6  → 6 after Buzz",     input: "6",  expected: "Buzz\n6",                    checkType: "contains" },
      { id: 6,  label: "n=9  → Fizz on 9",        input: "9",  expected: "7\n8\nFizz",                 checkType: "contains" },
      { id: 7,  label: "n=10 → Buzz on 10",       input: "10", expected: "8\nFizz\nBuzz",              checkType: "contains" },
      { id: 8,  label: "n=15 → FizzBuzz on 15",   input: "15", expected: "FizzBuzz",                   checkType: "contains" },
      { id: 9,  label: "n=15 → no 15 as number",  input: "15", expected: "14\nFizzBuzz",               checkType: "contains" },
      { id: 10, label: "n=15 → Fizz on 12",       input: "15", expected: "11\nFizz\n13",               checkType: "contains" },
    ],
  },
];

/**
 * Get the 10 test cases for a given task number (1–8).
 */
export function getTestCases(taskNumber: number): TestCase[] {
  return ALL_TEST_CASES.find(t => t.taskNumber === taskNumber)?.cases ?? [];
}
