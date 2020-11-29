const recordContainer = document.getElementById('jsRecordContainer');
const recordBtn = document.getElementById('jsRecordBtn');
const videoPreview = document.getElementById('jsVideoPreview');

let streamObject;
let videoRecorder;

const handleVideoData = event => {
    const {
        data: videoFile
    } = event;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(videoFile);
    link.download = 'recorded.webm'; // opensource, 이와같은 이름으로 다운로드됨.
    document.body.appendChild(link);
    link.click();
}

const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener('click', stopRecording);
    recordBtn.addEventListener('click', getVideo);
    recordBtn.innerHTML = 'Start Recording';
}

const startRecording = () => {
    var options = {
        mimeType: 'video/webm;codecs=vp9'
    };
    videoRecorder = new MediaRecorder(streamObject, options);
    videoRecorder.start();
    videoRecorder.addEventListener('dataavailable', handleVideoData);
    recordBtn.addEventListener('click', stopRecording);
}

// media를 user에서부터 얻어와서 video에 넣어야함.
const getVideo = async () => {
    try {
        // await : 사용자가 media에 대한 접근을 허용해줄때까지 기다림
        // getUserMedia(configuration object : 확인 객체)
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: 1280,
                height: 720
            }
        });
        console.log('getVideo', stream)
        // stream은 file이 아니라 Object이므로 src로 줄 수 없음!
        videoPreview.srcObject = stream;
        streamObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = 'Stop Recording';
        startRecording();
    } catch (err) {
        // 사용자가 허락하지 않으면
        recordBtn.innerHTML = "😥 Can't record";
    } finally {
        // finally : try의 실행이 끝난 후 예외 발생 여부에 상관없이 반드시 실행된다.
        recordBtn.removeEventListener('click', getVideo);
    }
}

const init = () => {
    recordBtn.addEventListener('click', getVideo);
}

if (recordContainer) {
    init();
}