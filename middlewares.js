import multer from 'multer'
import routes from './routes';

const multerVideo = multer({dest: 'uploads/videos/' }); // video/라는 폴더를 자동으로 생성하여 업로드된 비디오파일을 링크 형태로 제공 가능

export const localsMiddleware = (req, res, next) => {
    // locals : 로컬 변수 응답을 포함하는 객체
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthentificated: false,
        id: 1
    }
    next(); // 다음 함수로 이동
};

export const uploadVideo = multerVideo.single('videoFile') // sigle('name of video element') : 하나의 파일만 업로드 가능