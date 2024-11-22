function add(x, y) {
  return (x += y);
}

function subtract(x, y) {
  return (x -= y);
}

function multiply(x, y) {
  return (x *= y);
}

function divide(x, y) {
  if (y === 0) {
    return 'ERROR!';
  } else {
    return (x /= y);
  }
}

function calculate(op, x, y) {
  if (op(x, y) === 'ERROR!') {
    return 'ERROR!';
  } else {
    return Math.floor(op(Number(x), Number(y)) * 1000) / 1000;
  }
}

const screen = document.querySelector('.screen-operand');
const opScreen = document.querySelector('.screen-operator');
const nums = document.querySelectorAll('.num');
const decimal = document.querySelector('.decimal');
const sign = document.querySelector('.sign');
const del = document.querySelector('.del');
const clear = document.querySelector('.clear');
const ac = document.querySelector('.allClear');
const operators = document.querySelectorAll('.operator');
const addition = document.querySelector('#add');
const subtraction = document.querySelector('#subtract');
const multiplication = document.querySelector('#multiply');
const division = document.querySelector('#divide');
const equals = document.querySelector('#equals');

let storedOperand = null;
let currentOperand = null;
let storedOperator = null;

function getStoredOperand(num) {
  return (storedOperand = Number(num));
}

function getCurrentOperand(num) {
  return (currentOperand = Number(num));
}

function clearAll() {
  storedOperand = null;
  currentOperand = null;
  storedOperator = null;
  screen.textContent = null;
  opScreen.textContent = null;
}

function calculation(operator) {
  currentOperand = getCurrentOperand(screen.textContent);
  switch (operator) {
    case 'add':
      storedOperand = calculate(add, storedOperand, currentOperand);
      currentOperand = null;
      storedOperator = null;
      break;
    case 'subtract':
      storedOperand = calculate(subtract, storedOperand, currentOperand);
      currentOperand = null;
      storedOperator = null;
      break;
    case 'multiply':
      storedOperand = calculate(multiply, storedOperand, currentOperand);
      currentOperand = null;
      storedOperator = null;
      break;
    case 'divide':
      storedOperand = calculate(divide, storedOperand, currentOperand);
      currentOperand = null;
      storedOperator = null;
      break;
  }
}

nums.forEach((num) => {
  num.addEventListener('click', function () {
    if (screen.textContent === 'ERROR!') {
      clearAll();
      return (screen.textContent += num.id);
    } else if (screen.textContent.length < 9) {
      return (screen.textContent += num.id);
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', function () {
    opScreen.textContent = '';
    if (screen.textContent === 'ERROR!') {
      clearAll();
    } else if (storedOperand === null && screen.textContent === '') {
      storedOperator = operator.id;
      opScreen.textContent = operator.textContent;
    } else if (storedOperand === null) {
      storedOperand = getStoredOperand(screen.textContent);
      storedOperator = operator.id;
      screen.textContent = '';
      opScreen.textContent = operator.textContent;
    } else if (storedOperand !== null && screen.textContent === '') {
      opScreen.textContent = operator.textContent;
      storedOperator = operator.id;
      screen.textContent = '';
    } else if (storedOperand !== null && screen.textContent !== '') {
      calculation(storedOperator);
      screen.textContent = '';
      opScreen.textContent = operator.textContent;
      storedOperator = operator.id;
    }
  });
});

equals.addEventListener('click', function () {
  if (storedOperand !== null && storedOperator !== null) {
    calculation(storedOperator);
    screen.textContent = storedOperand;
    opScreen.textContent = equals.textContent;
  }
});

decimal.addEventListener('click', function () {
  if (screen.textContent.indexOf('.') === -1) {
    return (screen.textContent += decimal.id);
  }
});

sign.addEventListener('click', function () {
  if (screen.textContent === 'ERROR!') {
    clearAll();
  } else if (screen.textContent.indexOf('-') === -1) {
    return (screen.textContent = '-' + screen.textContent);
  } else {
    return (screen.textContent = screen.textContent.substring(1));
  }
});

del.addEventListener('click', function () {
  if (screen.textContent === 'ERROR!') {
    clearAll();
  } else if (screen.textContent.length) {
    return (screen.textContent = screen.textContent.slice(0, -1));
  }
});

clear.addEventListener('click', function () {
  if (screen.textContent === 'ERROR!') {
    clearAll();
  } else {
    return (screen.textContent = '');
  }
});

ac.addEventListener('click', function () {
  clearAll();
});
