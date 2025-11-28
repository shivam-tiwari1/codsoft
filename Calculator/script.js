let display = document.getElementById("display");
let buttons = document.querySelectorAll(".btn");
let clearBtn = document.getElementById("clear");
let equalsBtn = document.getElementById("equals");

let input = "";

// Loop through all buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        let value = button.getAttribute("data-value");

        // Skip buttons that don't have data-value (C and =)
        if (value === null) return;

        input += value;
        display.value = input;
    });
});

// Clear button
clearBtn.addEventListener("click", () => {
    input = "";
    display.value = "";
});

// Equals button
equalsBtn.addEventListener("click", () => {
    try {
        input = eval(input);
        display.value = input;
    } catch (error) {
        display.value = "Error";
    }
});

