import express from 'express';
import routes from '../routes'
import {
    home,
    search
} from "../controllers/videoController";
import {
    getJoin,
    postJoin,
    getLogin,
    postLogin,
    logout
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin)
globalRouter.post(routes.join, postJoin, postLogin)
// 회원가입(postJoin) 후(next()) 
// 해딩 username과 password값을 postLogin으로 보내서 처리

globalRouter.get(routes.login, getLogin)
globalRouter.post(routes.login, postLogin)

globalRouter.get(routes.home, home)
globalRouter.get(routes.logout, logout)
globalRouter.get(routes.search, search)

export default globalRouter;