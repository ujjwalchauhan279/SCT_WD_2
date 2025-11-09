let hours = 0, minutes = 0, seconds = 0, ms = 0;
let timer = null;
let running = false;
let audiostopwatch = new Audio("assets/stopwatch.mp3");
audiostopwatch.loop = true;

let lapCounter = 0; // to keep serial number for laps

// Updating display function
function updateDisplay() {
    document.querySelector('.hours').innerText = hours.toString().padStart(2, '0');
    document.querySelector('.min').innerText = minutes.toString().padStart(2, '0');
    document.querySelector('.sec').innerText = seconds.toString().padStart(2, '0');
    document.querySelector('.ms').innerText = ms.toString().padStart(2, '0');
}

// Start function
function start() {
    if (running) return;
    running = true;
    audiostopwatch.play();

    timer = setInterval(() => {
        ms++;
        if (ms === 100) {
            ms = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        updateDisplay();
    }, 10);
}

// Stop function
function stopWatch() {
    running = false;
    clearInterval(timer);
    audiostopwatch.pause();
    audiostopwatch.currentTime = 0;
}

// Reset function
function resetWatch() {
    running = false;
    clearInterval(timer);
    hours = minutes = seconds = ms = 0;
    updateDisplay();
    audiostopwatch.pause();
    audiostopwatch.currentTime = 0;
    document.querySelector('.lap-list').innerHTML = "";
    lapCounter = 0; // reset lap counter
}

// Lap function
function lap() {
    if (!running) return;

    lapCounter++;
    let lapSound = new Audio("assets/lap.mp3");
    lapSound.play();

    let lapTime =
        `${hours.toString().padStart(2, '0')} : ` +
        `${minutes.toString().padStart(2, '0')} : ` +
        `${seconds.toString().padStart(2, '0')} : ` +
        `${ms.toString().padStart(2, '0')}`;

    let li = document.createElement("li");
    li.classList.add("lap-item");

    li.innerHTML = `<span class="lap-no">${lapCounter}</span> <span class="lap-time">${lapTime}</span>`;

    document.querySelector(".lap-list").appendChild(li);
}

