import multer from 'multer'
import routes from './routes';

const multerVideo = multer({
    dest: 'uploads/videos/'
}); // video/라는 폴더를 자동으로 생성하여 업로드된 비디오파일을 링크 형태로 제공 가능

// locals : 로컬 변수 응답을 포함하는 객체
// passport 가 사용자가 로그인 시 user가 담긴 object를 요청(request)에도 올려주므로 아래와 같이 사용 가능)
// req.user : passport를 통해 user Object를 template에서 사용할 수 있음. 
// ex) header의 if(!user.isAuthentificated)
// next: 다음 함수로 이동
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = req.user || {};
    next();
};

export const uploadVideo = multerVideo.single('videoFile') // sigle('name of video element') : 하나의 파일만 업로드 가능