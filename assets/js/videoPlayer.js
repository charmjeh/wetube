const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumnBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreen");
const video = document.querySelector("video");

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
    } else {
        videoPlayer.muted = true;
        volumnBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

function goFullScreen() {
    if (!DocumentTimeline.fullscreenElement) {
        video.requestFullscreen().catch(err => {
            alert(`error atempting to enable full-screen mode: ${err.message} (${err.name})`)
        })
    }
}

function init() {
    playBtn.addEventListener("click", handlePlayClick);
    volumnBtn.addEventListener("click", handleVolumeClick);
    // HTMLMediaElement에 전체 화면인지 검사하는 함수가 없어서,
    // eventListner를 변경하고 제거하는 방식으로 처리
    fullScreenBtn.addEventListener("click", goFullScreen);
}

if (videoContainer) {
    init();
}