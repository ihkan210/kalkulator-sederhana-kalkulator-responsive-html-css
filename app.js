/* Calculator App Logic */
document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.btn');
  let currentInput = '';
  let previousInput = '';
  let operator = '';
  let result = '';

  // Update display function
  function updateDisplay() {
    display.value = currentInput || '0';
  }

  // Handle button clicks
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.textContent;

      if (button.classList.contains('operator')) {
        handleOperator(value);
      } else if (button.classList.contains('equals')) {
        handleEquals();
      } else if (button.classList.contains('zero')) {
        handleZero();
      } else if (button.textContent === 'C') {
        handleClear();
      } else if (button.textContent === '±') {
        handleToggleSign();
      } else if (button.textContent === '%') {
        handlePercentage();
      } else if (button.textContent === '.') {
        handleDecimal();
      } else {
        handleNumber(value);
      }

      updateDisplay();
    });
  });

  // Handle number input
  function handleNumber(num) {
    if (currentInput.length >= 16) return; // Limit input length
    if (currentInput === '0' && num !== '.') {
      currentInput = num;
    } else {
      currentInput += num;
    }
  }

  // Handle decimal point
  function handleDecimal() {
    if (!currentInput.includes('.')) {
      currentInput += '.';
    }
  }

  // Handle clear
  function handleClear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    result = '';
  }

  // Handle toggle sign (±)
  function handleToggleSign() {
    if (currentInput) {
      if (currentInput.startsWith('-')) {
        currentInput = currentInput.slice(1);
      } else {
        currentInput = '-' + currentInput;
      }
    }
  }

  // Handle percentage
  function handlePercentage() {
    if (currentInput) {
      currentInput = (parseFloat(currentInput) / 100).toString();
    }
  }

  // Handle operator input
  function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
      handleEquals();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
  }

  // Handle equals
  function handleEquals() {
    if (currentInput === '' || previousInput === '' || operator === '') return;
    
    const expression = previousInput + operator + currentInput;
    try {
      result = calculate(expression);
      currentInput = result.toString();
      previousInput = '';
      operator = '';
    } catch (error) {
      currentInput = 'Error';
    }
  }

  // Initialize display
  updateDisplay();
});