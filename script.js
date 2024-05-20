document.addEventListener("DOMContentLoaded", function() {
    let timer;
    let startTime = 0; 
    let lapCounter = 1;
    let elapsedTime = 0;
    let isRunning = false;

    function startStopwatch() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timer = setInterval(updateStopwatch, 10); 
            isRunning = true;
            document.getElementById("startStopBtn").innerText = "Stop";
            document.getElementById("startStopBtn").classList.remove("startBtn");
            document.getElementById("startStopBtn").classList.add("stopBtn");
            document.getElementById("lapResetBtn").innerText = "Lap";
            document.getElementById("lapResetBtn").classList.remove("resetBtn");
            document.getElementById("lapResetBtn").classList.add("lapBtn");
            document.getElementById("lapResetBtn").disabled = false;
        }
    }

    function stopStopwatch() {
        clearInterval(timer);
        isRunning = false;
        elapsedTime = Date.now() - startTime; 
        document.getElementById("startStopBtn").innerText = "Resume";
        document.getElementById("startStopBtn").classList.remove("stopBtn");
        document.getElementById("startStopBtn").classList.add("resumeBtn");
        document.getElementById("lapResetBtn").innerText = "Reset";
        document.getElementById("lapResetBtn").classList.remove("lapBtn");
        document.getElementById("lapResetBtn").classList.add("resetBtn");
    }

    function resumeStopwatch() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime; 
            timer = setInterval(updateStopwatch, 10);
            isRunning = true;
            document.getElementById("startStopBtn").innerText = "Stop";
            document.getElementById("startStopBtn").classList.remove("resumeBtn");
            document.getElementById("startStopBtn").classList.add("stopBtn");
            document.getElementById("lapResetBtn").innerText = "Lap";
            document.getElementById("lapResetBtn").classList.remove("resetBtn");
            document.getElementById("lapResetBtn").classList.add("lapBtn");
        }
    }

    function resetStopwatch() {
        clearInterval(timer);
        isRunning = false;
        elapsedTime = 0;
        document.getElementById("display").innerText = "00:00:00:000";
        document.getElementById("lapList").innerHTML = "";
        document.getElementById("startStopBtn").innerText = "Start";
        document.getElementById("startStopBtn").classList.remove("stopBtn", "resumeBtn");
        document.getElementById("startStopBtn").classList.add("startBtn");
        document.getElementById("lapResetBtn").innerText = "Lap";
        document.getElementById("lapResetBtn").classList.remove("resetBtn");
        document.getElementById("lapResetBtn").classList.add("lapBtn");
        document.getElementById("lapResetBtn").disabled = true;
        lapCounter = 1;
    }

    function updateStopwatch() {
        elapsedTime = Date.now() - startTime;
        let milliseconds = elapsedTime % 1000;
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let hours = Math.floor((elapsedTime / (1000 * 60 * 60)));

        milliseconds = milliseconds < 100 ? "0" + milliseconds : milliseconds;
        milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

        let formattedTime =
            (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds) + ":" +
            milliseconds;

        document.getElementById("display").innerText = formattedTime;
    }

    document.getElementById("startStopBtn").addEventListener("click", function() {
        if (isRunning) {
            stopStopwatch();
        } else {
            startStopwatch();
        }
    });

    document.getElementById("lapResetBtn").addEventListener("click", function() {
        if (isRunning) {
            let lapTime = document.getElementById("display").innerText;
            let lapItem = document.createElement("li");
            lapItem.innerText = `Lap ${lapCounter++}: ${lapTime}`;
            document.getElementById("lapList").appendChild(lapItem);
        } else {
            resetStopwatch();
        }
    });
});
