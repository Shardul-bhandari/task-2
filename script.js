let timer;
let isRunning = false;
let startTime;
let lapStartTime;
let lapCounter = 1;

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

function updateDisplay() {
    const currentTime = isRunning ? Date.now() - startTime : startTime;
    document.querySelector('.time').textContent = formatTime(currentTime);
}

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (startTime - startTime || 0);
        timer = setInterval(updateDisplay, 10);
    }
}

function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function reset() {
    isRunning = false;
    clearInterval(timer);
    startTime = 0;
    lapStartTime = 0;
    lapCounter = 1;
    document.querySelector('.time').textContent = '00:00:00';
    document.querySelector('.lap-list').innerHTML = '';
}

function lap() {
    if (isRunning) {
        const currentTime = Date.now() - startTime;
        const lapTime = currentTime - lapStartTime;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${formatTime(lapTime)}`;
        document.querySelector('.lap-list').appendChild(lapItem);
        lapStartTime = currentTime;
        lapCounter++;
    }
}

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);

