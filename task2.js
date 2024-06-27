let startTime;
let elapsedTime = 0;
let timerInterval;

function startStop() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById('startStopButton').innerText = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        document.getElementById('startStopButton').innerText = 'Stop';
    }
}

function updateTime() {
    const elapsedTimeMillis = Date.now() - startTime;
    elapsedTime = elapsedTimeMillis;
    updateDisplay();
}

function updateDisplay() {
    const ms = elapsedTime % 1000;
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    const displayElement = document.getElementById('display');
    displayElement.innerText = 
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms, 3)}`;
}

function pad(num, size = 2) {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
}

function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    updateDisplay();
    document.getElementById('startStopButton').innerText = 'Start';
    document.getElementById('laps').innerHTML = '';
}

function lap() {
    const currentTime = elapsedTime;
    const lapTime = currentTime - (lastLapTime || 0);
    lastLapTime = currentTime;

    const lapList = document.getElementById('laps');
    const lapItem = document.createElement('li');
    lapItem.innerText = formatTime(currentTime) + ` (lap: ${formatTime(lapTime)})`;
    lapList.appendChild(lapItem);
}

function formatTime(elapsedTimeMillis) {
    const ms = elapsedTimeMillis % 1000;
    const seconds = Math.floor(elapsedTimeMillis / 1000) % 60;
    const minutes = Math.floor(elapsedTimeMillis / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTimeMillis / (1000 * 60 * 60));
    
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms, 3)}`;
}