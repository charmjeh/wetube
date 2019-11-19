import routes from './routes';

export const localsMiddleware = (req, res, next) => {
    // locals : 로컬 변수 응답을 포함하는 객체
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthentificated: true,
        id: 1
    }
    next(); // 다음 함수로 이동
};