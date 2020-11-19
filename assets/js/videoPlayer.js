const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");

function handlePlayClick() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        videoPlayer.innerHTML = '<i class="fas fa-pause"></i>'
    } else {
        videoPlayer.pause();
        videoPlayer.innerHTML = '<i class="fas fa-play"></i>'
    }
}

function init() {
    playBtn.addEventListener("click", handlePlayClick);
}

// 엘리먼트가 존재하는지 먼저 검사
if (videoContainer) {
    init();
}