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
  }
  return (x /= y);
}

function calculate(op, x, y) {
  return op(Number(x), Number(y));
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
let storedOperator = '';

nums.forEach((num) => {
  num.addEventListener('click', function () {
    if (screen.textContent === 'ERROR!') {
      storedOperand = null;
      currentOperand = null;
      screen.textContent = '';
      opScreen.textContent = '';
    }
    if (screen.textContent.length < 8) {
      return (screen.textContent += num.id);
    }
  });
});

function getStoredOperand(num) {
  return (storedOperand = Number(num));
}

function getCurrentOperand(num) {
  return (currentOperand = Number(num));
}

function clearAll() {
  storedOperand = null;
  currentOperand = null;
  screen.textContent = '';
  opScreen.textContent = '';
}

function calculation(operator) {
  switch (operator) {
    case 'add':
      storedOperand = calculate(add, storedOperand, currentOperand);
      screen.textContent = storedOperand;
      break;
    case 'subtract':
      storedOperand = calculate(subtract, storedOperand, currentOperand);
      screen.textContent = storedOperand;
      break;
    case 'multiply':
      storedOperand = calculate(multiply, storedOperand, currentOperand);
      screen.textContent = storedOperand;
      break;
    case 'divide':
      storedOperand = calculate(divide, storedOperand, currentOperand);
      screen.textContent = storedOperand;
      break;
  }
}

equals.addEventListener('click', function () {
  if (storedOperand !== null) {
    currentOperand = getCurrentOperand(screen.textContent);
    calculation(storedOperator);
    opScreen.textContent = equals.textContent;
  }
});

operators.forEach((operator) => {
  operator.addEventListener('click', function () {
    opScreen.textContent = '';
    storedOperator = operator.id;
    if (storedOperand === null) {
      storedOperand = getStoredOperand(screen.textContent);
      screen.textContent = null;
    } else {
      screen.textContent = null;
      currentOperand = getCurrentOperand(screen.textContent);
    }
    return (opScreen.textContent += operator.textContent);
  });
});

decimal.addEventListener('click', function () {
  if (screen.textContent.indexOf('.') === -1) {
    return (screen.textContent += decimal.id);
  }
});

sign.addEventListener('click', function () {
  if (screen.textContent.indexOf('-') === -1) {
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
