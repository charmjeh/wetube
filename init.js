import dotenv from 'dotenv' // keep secure db info
import app from './app';
import './db'
dotenv.config(); // (.env파일의 변수를 (KEY = VALUE) 형태로 process.env에 넣음)
import './models/Video'
import './models/Comment'
import "./models/User"

const PORT = process.env.PORT || 4000

const handleListening = () =>
    console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);