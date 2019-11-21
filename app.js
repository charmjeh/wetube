import express from "express";
import morgan from "morgan"; // 애플리케이션에서 발생하는 모든 일들을 logging함
import helmet from "helmet" // 애플리케이션이 더 안전하도록 함
import cookieParser from "cookie-parser" // cookie를 전달받아서 사용할 수 있도록함
import bodyParser from "body-parser" // 사용자가 웹사이트로 전달하는 정보들을 검사함
import { localsMiddleware } from './middlewares'
import globalRouter from "./routers/globalRouter"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import routes from './routes'

const app = express();

app.use(helmet());
app.set('view engine', 'pug'); // 템플릿 언어, express의 view engine
app.use('/uploads', express.static('uploads')); // middleware to serve files from whithin a given root directory
app.use(cookieParser()); // 쿠키를 전달받아 사용할 수 있도록 함
app.use(bodyParser.json()) // 사용자가 웹사이트로 전달하는 정보들을 검사. request 정보에서 form이나 json 형태로 된 body 검사
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan("dev")); // application에서 발생하는 모든 일들을 logging

app.use(localsMiddleware) // local 기능을 통해 변수에 접근, 반드시 라우터 전에 선언해야함.

app.use(routes.users, userRouter);
app.use(routes.home, globalRouter);
app.use(routes.videos, videoRouter);

export default app;