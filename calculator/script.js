let currentInput = '';

function appendToDisplay(value) {
    if (value === '=') {
        calculate();
    } else if (value === 'AC') {
        clearDisplay()
    } else {
        currentInput += value;
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById('display').value = currentInput || '0';
    document.getElementById('display_2').value = currentInput || '0';
}

function clearDisplay() {
    currentInput = '';
    updateDisplay();
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
    } catch {
        currentInput = 'Error';
    }
    updateDisplay();
}
