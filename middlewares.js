import routes from './routes';

export const localsMiddleware = (req, res, next) => {
    // locals : 로컬 변수 응답을 포함하는 객체
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    next(); // 다음 함수로 이동
};