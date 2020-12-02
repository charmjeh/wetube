import dotenv from 'dotenv' // keep secure db info
dotenv.config(); // (.env파일의 변수를 (KEY = VALUE) 형태로 process.env에 넣음)
import './db'
import app from './app';

// we import this because we need to make the mongoose connection 
// aware of the models that we weill save in the futrue
import './models/Video'
import './models/Comment'
import "./models/User"

const PORT = process.env.PORT || 4000

const handleListening = () =>
    console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening); // 4000포트로 접근 시 handleListening 실행됨.