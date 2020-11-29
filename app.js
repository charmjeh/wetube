import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan'; // 애플리케이션에서 발생하는 모든 일들을 logging함
import helmet from 'helmet' // 애플리케이션이 더 안전하도록 함
import cookieParser from 'cookie-parser'; // cookie를 전달받아서 사용할 수 있도록함
import bodyParser from 'body-parser'; // 사용자가 웹사이트로 전달하는 정보들을 검사함
import passport from 'passport';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import {
    localsMiddleware
} from './middlewares';
import routes from './routes';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import './passport'

const app = express(); // express 실행
const CookieStore = MongoStore(session)
app.use(favicon(path.join(__dirname, '/', 'favicon.ico')))
app.use(helmet());
app.set('view engine', 'pug'); // 템플릿 언어, express의 view engine
app.use('/uploads', express.static('uploads')); // middleware to serve files from whithin a given root directory
app.use('/static', express.static('static')); // static 경로로 접근 시 static 폴더를 찾도록 함
app.use(cookieParser()); // 쿠키를 전달받아 사용할 수 있도록 함
app.use(bodyParser.json()); // 사용자가 웹사이트로 전달하는 정보들을 검사. request 정보에서 form이나 json 형태로 된 body 검사
app.use(bodyParser.urlencoded({
    extended: true
}))
// application에서 발생하는 모든 일들을 logging
// OPTION
//  - dev : GET /PROFILE 304
//  - combined : 접속 종류 및 브라우저 등 더 상세한 버전

app.use(morgan("dev"));
// 세션 => 쿠키를 해독한다. (실제 id: 1와 같은 값이 된다.)
// express-session의 secret은 필수 옵션으로, session ID의 암호화를 위한 것임.
// randomkeygen.com에서 랜덤 문자열을 가져오면 편하다.
// resave : 세션 강제 저장
// saveUninitialized : 초기화되지 않은 세션을 저장소에 저장. 로그인용 세션은 false 권장.
// store: CookieStore와 mongo간의 연결을 만든다.
// mongoose는 이 저장소를 데이터 베이스에 연결하며,
// 서버가 재시작되어도 쿠키가 보존되어 유저가 로그인 상태를 유지할 수 있게 한다.
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
        mongooseConnection: mongoose.connection
    })
}))
app.use(passport.initialize());
app.use(passport.session());
// 위에서 실행된 cookieParser로부터 쿠키가 내려와서
// passport는 초기화(initialize)되고,
// 그 다음 passport가 스스로 쿠키를 들여다 봐서 쿠키정보에 해당하는 사용자를 찾음
// 그 후 찾은 사용자를 요청(request)의 object, 즉 req.user로 만들어줌 (middleware.js의 localsMiddleware부분 참조)

// local 기능을 통해 변수에 접근, 반드시 라우터 전에 선언해야함.
app.use(localsMiddleware);

app.use(routes.users, userRouter);
app.use(routes.home, globalRouter);
app.use(routes.videos, videoRouter);

export default app;