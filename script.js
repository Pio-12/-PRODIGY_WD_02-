let startTime, updatedTime, difference, tInterval;
let running = false;
const timeDisplay = document.getElementById('timeDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimesList = document.getElementById('lapTimes');
const showMoreLapsBtn = document.getElementById('showMoreLapsBtn');
let lapCount = 0;
let laps = [];
let showAllLaps = false;

// Function to start the stopwatch
function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 10);
        running = true;
        startStopBtn.innerHTML = 'Stop';
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerHTML = 'Start';
    }
}

// Function to reset the stopwatch
function resetTimer() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    lapCount = 0; // Reset lap count
    laps = []; // Clear laps array
    timeDisplay.innerHTML = '00:00:00.00';
    lapTimesList.innerHTML = ''; // Clear lap times
    showMoreLapsBtn.style.display = 'none'; // Hide show more button
    startStopBtn.innerHTML = 'Start';
}

// Function to display the current time in the stopwatch
function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    timeDisplay.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Function to add a lap time
function addLap() {
    if (running) {
        lapCount++;
        laps.push(timeDisplay.innerHTML); // Store the lap time
        updateLapDisplay();
    }
}

// Function to update lap display
function updateLapDisplay() {
    lapTimesList.innerHTML = ''; // Clear previous lap times
    const lapsToShow = showAllLaps ? laps : laps.slice(-4); // Determine laps to show
    lapsToShow.forEach((lap, index) => {
        const li = document.createElement('li');
        li.innerText = `Lap ${index + 1}: ${lap}`;
        lapTimesList.appendChild(li);
    });

    // Show or hide the Show More button
    showMoreLapsBtn.style.display = laps.length > 4 ? 'block' : 'none';
}

// Function to toggle lap display
function toggleLapDisplay() {
    showAllLaps = !showAllLaps;
    updateLapDisplay();
    showMoreLapsBtn.innerText = showAllLaps ? 'Show Less' : 'Show More';
}

// Event listeners for buttons
startStopBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
showMoreLapsBtn.addEventListener('click', toggleLapDisplay);

// Show current time
function showCurrentTime() {
    const now = new Date();
    const currentTime = document.getElementById('currentTime');
    currentTime.innerHTML = 'Time Now: ' + now.toLocaleTimeString();
}

setInterval(showCurrentTime, 1000);
