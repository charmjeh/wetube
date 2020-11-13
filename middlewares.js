import multer from 'multer'
import routes from './routes';

// video/라는 폴더를 자동으로 생성하여 업로드된 비디오파일을 링크 형태로 제공 가능
// '/uploads/videos' 형태로는 쓰면 안됨, 해당 위치가 현재 프로젝트에 있는 폴더라고 생각하여
// 컴퓨터의 root에 upload를 만들게 된다.
const multerVideo = multer({
    dest: 'uploads/videos/'
});

// locals : 로컬 변수 응답을 포함하는 객체 (전역 범위에 변수를 추가하기 위해 사용)
// 템플릿에서 로컬변수를 사용 시 #{siteName}, href=routes.join과 같이 쓸 수 있음
// passport 가 사용자가 로그인 시 user가 담긴 object를 요청(request)에도 올려주므로 아래와 같이 사용 가능)
// req.user : passport를 통해 user Object를 template에서 사용할 수 있음. 
// next: 다음 함수로 이동
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = req.user || null;
    next();
};

// 로그아웃 상태에서만 접근을 허용
export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
}

// 로그인 상태에서만 접근을 허용
export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home)
    }
}
// sigle('name of video element') : 하나의 파일만 업로드 가능
// file(name=videoFile)
export const uploadVideo = multerVideo.single('videoFile')