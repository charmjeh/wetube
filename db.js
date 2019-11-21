import mongoose from 'mongoose'
import dotenv from 'dotenv' // keep secure db info
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL, // (urls:string, ..localhost:포트번호/데이터베이스명, where is your database stored)
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connected to DB")
const handleError = () => console.log("❌  Error on db connection")

db.once('open', handleOpen)
db.on('error', handleError)
