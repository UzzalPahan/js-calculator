class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    this.currentOperand = number;
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand =
      this.currentOperandTextElement.innerText.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand != null) {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = `${this.currentOperand} ${this.operation}`;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        break;
    }

    this.currentOperand = computation;
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

const numberButton = document.querySelectorAll("[data-number]");
const operatorButton = document.querySelectorAll("[data-operator]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const equalButton = document.querySelector("[data-equal]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

// for equal button
equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

//for delete button
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
