// Extract operation from String of operations
// Parse the string into multiple elements
// Feed it into some function that does the math
// Replace it back in the string

// BONUS
// add ability to do exponents
// add ability to do parenthesis

const form = document.querySelector("#equation-form");
const input = document.querySelector("#equation");
const result = document.querySelector("#results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.querySelector("#equation").value);

  // Grab the value sent through form and store it in a variable
  let stringToParse = e.target.querySelector("#equation").value;

  // Create various RegEx checks for different situations
  // The while loop checks for existence of math signs and if the number is not a negative number
  while (/[+\-/*\^]/.test(stringToParse) && !/\-\d+/.test(stringToParse)) {
    const regexPlus = `(\\d+)\\s*(\\+)\\s*(\\d+)`;
    const regexMinus = `(\\d+)\\s*(\\-)\\s*(\\d+)`;
    const regexDivided = `(\\d+)\\s*(\\/)\\s*(\\d+)`;
    const regexMultiplied = `(\\d+)\\s*(\\*)\\s*(\\d+)`;
    const regexParenthesis = `\\((\\d+)\\s*([*\-\^/+])\\s*(\\d+)\\)`;
    const regexExponents = `(\\d+)\\s*(\\^)\\s*(\\d+)`;

    // Check for existence of math operations per priority
    if (new RegExp(regexParenthesis).test(stringToParse)) {
      parseMathOperation(stringToParse, regexParenthesis);
    } else if (new RegExp(regexExponents).test(stringToParse)) {
      parseMathOperation(stringToParse, regexExponents);
    } else if (new RegExp(regexMultiplied).test(stringToParse)) {
      parseMathOperation(stringToParse, regexMultiplied);
    } else if (new RegExp(regexDivided).test(stringToParse)) {
      parseMathOperation(stringToParse, regexDivided);
    } else if (new RegExp(regexMinus).test(stringToParse)) {
      parseMathOperation(stringToParse, regexMinus);
    } else if (new RegExp(regexPlus).test(stringToParse)) {
      parseMathOperation(stringToParse, regexPlus);
    }

    function parseMathOperation(matchedMathOperation, regex) {
      // Grab string and extract the math operation then break it down
      const dissectMathOperationRegEx = new RegExp(regex);
      const dissectedMathOperation =
        dissectMathOperationRegEx.exec(matchedMathOperation);

      // do the math then convert the result to string
      const replacementString = doTheMath(dissectedMathOperation).toString();

      // Replace the math operation in the original string with its result
      stringToParse = stringToParse.replace(
        dissectMathOperationRegEx,
        replacementString
      );
    }

    // Destructure the array of RegEx matches and feed it to corresponding math operation
    function doTheMath([, number1, operator, number2]) {
      const mathOperations = {
        "/": function () {
          return Number(number1) / Number(number2);
        },
        "*": function () {
          return Number(number1) * Number(number2);
        },
        "+": function () {
          return Number(number1) + Number(number2);
        },
        "-": function () {
          return Number(number1) - Number(number2);
        },
        "^": function () {
          return Number(number1) ** Number(number2);
        },
      };

      return mathOperations[operator]();
    }

    // Once while loop is done, parse the result into the Results DIV
    result.textContent = stringToParse;
  }
});
