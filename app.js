import express from "express";
import morgan from "morgan";
import helmet from "helmet"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import { userRouter } from "./router"

const app = express();

const handleHome = (req, res) => res.send('hello from /')
const handleProfile = (req, res) => res.send('hello from profile')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet());
app.use(morgan("dev"));

app.get('/', handleHome);
app.get('/profile', handleProfile);
app.use('/user', userRouter); // use를 사용함으로써 /user에 접속 시 userRouter 전체를 사용하게 됨.

export default app;