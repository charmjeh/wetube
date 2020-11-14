import express from 'express';
import passport from 'passport';
import routes from '../routes';
import {
    home,
    search
} from "../controllers/videoController";
import {
    getJoin,
    getLogin,
    logout,
    postJoin,
    postLogin,
    githubLogin,
    postGithubLogIn,
    getMe,
    facebookLogin,
    postFacebookLogin
} from "../controllers/userController";
import {
    onlyPublic,
    onlyPrivate
} from '../middlewares'

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
// 회원가입(postJoin) 후(next()) 
// 해딩 username과 password값을 postLogin으로 보내서 처리

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.gitHub, githubLogin);

// 로그인을 마치고 callback으로 들어오면
// authenticate을 사용하여 githubLoginCallback 함수를 실행한다.
// 이후 postGithubLogin을 사용하여 사용자를 home화면으로 보내준다.
globalRouter.get(
    routes.githubCallback,
    passport.authenticate("github", {
        failureRedirect: "/login"
    }),
    postGithubLogIn
);
globalRouter.get(routes.me, getMe)

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
    routes.facebookCallback, passport.authenticate(
        'facebook', {
            failureRedirect: '/login'
        },
        postFacebookLogin
    ))
export default globalRouter;