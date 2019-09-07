let runningTotal = 0; // everything is at zero
let buffer = "0" // as the user enters the numbers it equals zero until a command is given
let previousOperator = null; //keeping track of operators pressed on after entering a digit.
const screen = document.querySelector('.screen');

document.querySelector('.calc-buttons').addEventListener('click', function(event) {
    buttonClicked(event.target.innerText);
});

// function buttonclicked
function buttonClicked(value) {
    if(isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

// FUNCTION handlenumber which is going to take in a value
function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
    } else {
        buffer += value;
    }
    
}

// FUNCTION handlesymbol which is going to take in a value as well
function handleSymbol(value) {
    switch(value){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case "=":
            if(previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator === null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case "←":
            if(buffer.length ===1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }

}

// math part
function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "*") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}


//rerender function {makes the innertext visible when tapped}
function rerender() {
    screen.innerText = buffer;
}