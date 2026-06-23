// Calculator calculation logic
function calculate(expression) {
  // Remove whitespace
  expression = expression.trim();

  // Validate expression: only numbers, decimal point, and operators + - * %
  if (!/^[\d+\-*/.% ]+$/.test(expression)) {
    throw new Error('Invalid expression');
  }

  // Replace % with /100 for percentage calculation
  expression = expression.replace(/%/g, '/100');

  // Handle multiple consecutive operators (like ++, --, etc.) - simple approach: replace with last operator
  // But better to use a proper parser; for simplicity, we'll use Function constructor with validation? 
  // Since we already validated characters, we can use Function but better to avoid eval.
  // We'll implement a simple shunting-yard or split by operators.

  // Instead, we'll use a simple approach: split by operators and keep track.
  // But given time, we'll use Function with CSP? CSP blocks inline script but not new Function? 
  // CSP script-src 'self' does not allow unsafe-eval, so new Function is also blocked.
  // So we need a safe parser.

  // Let's implement a simple two-stack algorithm (shunting-yard) for + - * / and parentheses? 
  // We don't have parentheses in our calculator (no parentheses buttons). So we can do left-to-right with precedence.

  // Since we only have + - * / and left-to-right entry, we can compute as we go.
  // However, the expression string is built from previousInput, operator, currentInput.
  // We already have previousInput, operator, currentInput stored separately in app.js.
  // Actually, the calculate function is called from app.js with expression = previousInput + operator + currentInput.
  // We can compute directly using those variables without parsing string.
  // But we already have the expression string; we can compute using the stored values.
  // However, to keep calculate independent, we'll parse.

  // Simpler: since we only have two numbers and one operator, we can split.
  // But the expression could be like "10+5*2"? No, because we only allow one operator at a time (since we set operator and reset currentInput).
  // So expression will be like "12.5+3". So we can split by the operator.
  // However, we need to know which operator is the one we stored. Safer to compute using the stored values in app.js.
  // But we already have the expression string; we can extract operator and numbers.

  // Let's find the operator position (the one that is not a minus sign at start?).
  // We'll assume the operator is the first +, -, *, / that is not at the start (unless the first char is minus for negative number).
  // Since we don't have parentheses, we can do:

  // Find the operator index: skip first char if it's minus (for negative number)
  let opIndex = -1;
  for (let i = 1; i < expression.length; i++) {
    const ch = expression[i];
    if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
      opIndex = i;
      break;
    }
  }
  if (opIndex === -1) {
    throw new Error('No operator found');
  }

  const left = parseFloat(expression.slice(0, opIndex));
  const op = expression[opIndex];
  const right = parseFloat(expression.slice(opIndex + 1));

  if (isNaN(left) || isNaN(right)) {
    throw new Error('Invalid numbers');
  }

  let result;
  switch (op) {
    case '+':
      result = left + right;
      break;
    case '-':
      result = left - right;
      break:
    case '*':
      result = left * right;
      break;
    case '/':
      if (right === 0) {
        throw new Error('Division by zero');
      }
      result = left / right;
      break;
    default:
      throw new Error('Unknown operator');
  }

  // Handle floating point precision: round to 10 decimal places to avoid floating point errors
  result = Math.round(result * 10000000000) / 10000000000;
  // Remove trailing zeros
  return parseFloat(result.toString());
}