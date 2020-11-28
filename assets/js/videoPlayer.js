const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumnBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreen");
const video = document.querySelector("video");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const videoRange = document.getElementById('jsVolume');

function handlePlayClick() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function handleVolumeClick() {
    if (videoPlayer.muted) {
        videoPlayer.muted = false;
        volumnBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        videoRange.value = videoPlayer.volume;
    } else {
        videoRange.value = 0;
        videoPlayer.muted = true;
        volumnBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

function exitFullScreen() {
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenBtn.addEventListener("click", goFullScreen);
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function goFullScreen() {
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
    }
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreenBtn.removeEventListener("click", goFullScreen);
    fullScreenBtn.addEventListener("click", exitFullScreen);
}

const formatDate = seconds => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (seconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
    currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime))
}

function setVideoTime() {
    const totalTimeValue = formatDate(videoPlayer.duration);
    totalTime.innerHTML = totalTimeValue;
    setInterval(getCurrentTime, 1000)
}

function handleEnded() {
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
    const {
        target: {
            value
        }
    } = event;
    videoPlayer.volume = value;
    if (value >= 0.6) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else if (value >= 0.2) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }
}

function init() {
    videoPlayer.volume = 0.5;
    playBtn.addEventListener("click", handlePlayClick);
    volumnBtn.addEventListener("click", handleVolumeClick);
    // HTMLMediaElement에 전체 화면인지 검사하는 함수가 없어서,
    // eventListner를 변경하고 제거하는 방식으로 처리
    fullScreenBtn.addEventListener("click", goFullScreen);
    videoPlayer.addEventListener('loadedmetadata', setVideoTime);
    videoPlayer.addEventListener('ended', handleEnded)
    videoRange.addEventListener('input', handleDrag)
}

if (videoContainer) {
    init();
}