// script.js

let timer;
let totalSeconds;
let isRunning = false;

const taskInput = document.getElementById("taskInput");
const timeInput = document.getElementById("timeInput");
const startButton = document.getElementById("startButton");
const timerDisplay = document.getElementById("timerDisplay");
const popup = document.getElementById("popup");
const snoozeButton = document.getElementById("snoozeButton");
const closeButton = document.getElementById("closeButton");

startButton.addEventListener("click", function() {
    if (isRunning) {
        clearInterval(timer);
        startButton.textContent = "Start";
        isRunning = false;
    } else {
        let minutes = parseInt(timeInput.value);
        if (isNaN(minutes) || minutes <= 0) {
            alert("Please enter a valid time in minutes.");
            return;
        }
        totalSeconds = minutes * 60;
        isRunning = true;
        startButton.textContent = "Pause";
        updateTimer();
        timer = setInterval(updateTimer, 1000);
    }
});

function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (totalSeconds <= 0) {
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = "Start";
        showPopup();
    } else {
        totalSeconds--;
    }
}

function showPopup() {
    popup.classList.remove("hidden");
    new Audio('alarm.mp3').play(); 
}

snoozeButton.addEventListener("click", function() {
    popup.classList.add("hidden");
    totalSeconds = 5 * 60; // Snooze for 5 minutes
    isRunning = true;
    startButton.textContent = "Pause";
    timer = setInterval(updateTimer, 1000);
});

closeButton.addEventListener("click", function() {
    popup.classList.add("hidden");
});
