"use strict";

// Part 1
var equation_result;

function randint(min, max) {
    // Generate a random integer between min and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate() {
    var first_number = randint(1, 10);
    var second_number = randint(1, 10);
    var larger_number = Math.max(first_number, second_number);
    var smaller_number = Math.min(first_number, second_number);
    var random_op = randint(0, 2);
    var operations = ["+", "-", "*"];
    var operator = operations[random_op];
    return [larger_number, smaller_number, operator];
}

function get_captcha() {
    var generated = generate();
    var larger_number = generated[0];
    var smaller_number = generated[1];
    var operator = generated[2];
    var result = Number();
    switch (operator) {
        case "+":
            result = larger_number + smaller_number;
            break;
        case "-":
            result = larger_number - smaller_number;
            break;
        case "*":
            result = larger_number * smaller_number;
            break;
    }
    var equation = larger_number.toString() + " " + operator + " ";
    equation += smaller_number.toString();
    var message = "Calculate " + equation;
    return [message, result];
}

function captcha() {
    var result_div = document.getElementById("resultMsg");
    result_div.style.display = "none";
    var result = get_captcha();
    var message = result[0];
    equation_result = result[1];
    var label = document.getElementById("taskMsg");
    var input = document.getElementById("mathIn");
    input.value = "";
    label.textContent = message;
}


function evaluateResult() {
    var input = document.getElementById("mathIn");
    var result_div = document.getElementById("resultMsg");
    result_div.style.display = "block";
    if (String(equation_result) === input.value) {
        result_div.textContent = "correct";
        result_div.className = "alert alert-success";
    }
    else {
        result_div.textContent = "incorrect";
        result_div.className = "alert alert-danger";
    }
    setTimeout(captcha, 5000);
}

// Part 2
function add_number(number, max) {
    var div = document.getElementById("loopOutput");
    var text = document.createTextNode(String(number));
    div.appendChild(text);
    if (number !== max) {
        var linebreak = document.createElement("br");
        div.appendChild(linebreak);
    }
}

function add_number_delay(number, max) {
    setTimeout(function () {
        add_number(number, max);
    }, 10);
}

function printLoop() {
    var number_input = document.getElementById("loopNumber");
    var div = document.getElementById("loopOutput");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    var max = Number(number_input.value);
    for (var i = 1; i <= max; i++) {
        // can't call the setTimeout here because the i variable will have 
        // become max + 1 by the time it's run, so i need to call a delegate
        // function that calls the setTimeout.
        add_number_delay(i, max);
    }

}

document.addEventListener("DOMContentLoaded", function (event) {
    //Generate a captcha when the page is loaded
    captcha();
});

// Allows you to submit the form instead of pressing the button
document.querySelector("#mathCheck form").addEventListener("submit",
    function (e) {
        e.preventDefault();
        evaluateResult();
    }
);

document.querySelector("#forLoopDiv form").addEventListener("submit",
    function (e) {
        e.preventDefault();
        printLoop();
    }
);