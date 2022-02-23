//Getting data from the document
const counterDiv = document.querySelector('[data-counter]');
const operatorsDiv = document.querySelector('[data-operators]');


//Creating counter display
const output = document.createElement('h2');
output.textContent = '0';
output.setAttribute('class', 'output');
counterDiv.insertBefore(output, counterDiv.childNodes['2']); //Insert "output" element as the third element of "counter" div


//Creating subtraction button
const subtractionButton = document.createElement('button');
subtractionButton.setAttribute('type', 'button');
subtractionButton.setAttribute('class', 'subtraction');
subtractionButton.textContent = '-';
operatorsDiv.appendChild(subtractionButton);


//Creating sum button
const sumButton = document.createElement('button');
sumButton.setAttribute('type', 'button');
sumButton.setAttribute('class', 'sum');
sumButton.textContent = '+';
operatorsDiv.appendChild(sumButton);


//Creating reset button
const resetButton = document.createElement('button');
resetButton.setAttribute('type', 'button');
resetButton.setAttribute('class', 'reset');
resetButton.textContent = 'reset';
counterDiv.appendChild(resetButton);


//Declaring events functions
function outputTextColor() {
  if (output.textContent < 0) {
  output.style.color = '#4cc9f0';
  } else if (output.textContent == 0) {
  output.style.color = '#3a0ca3';
  } else if (output.textContent > 0) {
    output.style.color = '#f72585';
  };
};


function add() {
  output.textContent = +(output.textContent) + 1; //The "+" sign before prentesis is a cleaner alternative for "parseInt"
  outputTextColor();
};


function subtract() {
  output.textContent = +(output.textContent) - 1;
  outputTextColor();
};


function clear() {
  output.textContent = 0;
  outputTextColor();
};


//Data events
sumButton.addEventListener('click', add);
subtractionButton.addEventListener('click', subtract);
resetButton.addEventListener('click', clear)

