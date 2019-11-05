import express from "express";
import morgan from "morgan"; // 애플리케이션에서 발생하는 모든 일들을 logging함
import helmet from "helmet" // 애플리케이션이 더 안전하도록 함
import cookieParser from "cookie-parser" // cookie를 전달받아서 사용할 수 있도록함
import bodyParser from "body-parser" // 사용자가 웹사이트로 전달하는 정보들을 검사함
import globalRouter from "./routers/globalRouter"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import routes from './routes'

const app = express();

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet());
app.use(morgan("dev"));

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;