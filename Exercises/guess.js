document.getElementById("checkButton").addEventListener("click", function () {
    checkRandomNumber();
});

function checkRandomNumber() {
    let user_number = Number(document.getElementById("userNumber").value);
    let message_div = document.getElementById("resultMsg");
    if (check_guess(user_number)) {
        message_div.textContent = "You guessed right";
    } else {
        message_div.textContent = "Wrong guess - try again";
    }
}

function randint(min, max) {
    // Generate a random integer between min and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function check_guess(user_number) {
    let num = randint(0, 8);
    return Math.abs(user_number - num) < 0.00001;
}