

document.addEventListener('DOMContentLoaded',  () => {
    const display = document.querySelector('.display');
    let expression = '';

    function displayContent() {
        display.value = expression;
        // console.log(expression);
    }

    function clear() {
        expression = '';
        displayContent();
    }

    function calculate() {
       
            const operators = ['+', '-', '*', '/'];
            const operandStack = [];
            const operatorStack = [];
            let currentOperand = '';

            for (let i = 0; i < expression.length; i++) {
                const char = expression[i];
               
                if (!isNaN(char) || char === '.') {
                    currentOperand += char;
                    
                } else if (operators.includes(char)) {
                    if (currentOperand !== '') {
                        operandStack.push(parseFloat(currentOperand));
                        currentOperand = '';
                    }

                    while (
                        operatorStack.length > 0 &&
                        operators.indexOf(operatorStack[operatorStack.length - 1]) >= operators.indexOf(char)
                    ) {
                       
                        const operator = operatorStack.pop();
                        const secondValue = operandStack.pop();
                        const firstValue = operandStack.pop();
                        operandStack.push(performOperation(operator, firstValue, secondValue));
                        console.log(operator,secondValue,firstValue);
                    }

                    console.log(" operatorstack" ,operatorStack.length);
                    console.log("Index of operator stack",operators.indexOf(operatorStack[operatorStack.length - 1]) );
                    console.log("index of current char",operators.indexOf(char));
                   
                  

                    operatorStack.push(char);
                }
            }

            if (currentOperand !== '') {
                let operand = parseFloat(currentOperand);
                operandStack.push(operand);
            }

            // Looping the BODMAS rule
            while (operatorStack.length > 0) {
                const operator = operatorStack.pop();
                const secondValue = operandStack.pop();
                const firstValue = operandStack.pop();
                operandStack.push(performOperation(operator, firstValue, secondValue));
                console.log(operator,secondValue,firstValue);
            }

            expression = String(operandStack[0]);
            displayContent();
        } 
        
        let calculationCounter = 1;

        function performOperation(operator, firstValue, secondValue) {
            let result;
            
            switch (operator) {
                case '+':
                    result = firstValue + secondValue;
                    break;
                case '-':
                    result = firstValue - secondValue;
                    break;
                case '*':
                    result = firstValue * secondValue;
                    break;
                case '/':
                    result = firstValue / secondValue;
                    break;
                default:
                    throw new Error('Invalid operator');
            }
            
            const key = `calculationResult_${calculationCounter}`;

            

            // Store the result in local storage with the unique key
            localStorage.setItem(key, result);
            
        
            return result;
        }
        

    const buttons=document.querySelector('.calculator-buttons');
    
    buttons.addEventListener('click', e => {
        const target = e.target;
        // console.log(target.tagName);

        if (target.tagName === 'BUTTON') {
            const buttonValue = target.textContent;
            // console.log(buttonValue);

            switch (buttonValue) {
                case 'AC':
                 clear();
                    break;
                case '=':
                    calculate();
                     // Increment the counter for the next calculation
                    calculationCounter++;
                    break;
                case 'DEL':
                    expression = expression.slice(0, -1);
                    // console.log(expression);
                    displayContent();
                    break;
                default:
                    expression += buttonValue;
                    // console.log(expression);
                    displayContent();
                    break;
            }
        }

        
    });

    document.addEventListener('keydown', (e) => {
        const key = e.key;

        // Check if the pressed key is a digit, operator, or special key
        if (/[0-9+\-*/().=]|Backspace|Enter/.test(key)) {
            e.preventDefault(); // Prevent default action for certain keys

            // Map Enter key to '='
            const buttonValue = (key === 'Enter') ? '=' : key;

            switch (buttonValue) {
                case 'AC':
                    clear();
                    break;
                case '=':
                    calculate();
                    calculationCounter++;
                    break;
                case 'Backspace':
                    expression = expression.slice(0, -1);
                    displayContent();
                    break;
                default:
                    expression += buttonValue;
                    displayContent();
                    break;
            }
        }
});


});

