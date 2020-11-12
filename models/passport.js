import passport from 'passport';
import User from './models/User';

// strategy : 로그인 방법(깃허브/아이디비밀번호/페이스북)
// 사용자 아이디를 쿠키에 담아 저장하고 그를 통해 사용자를 식별할 수 있도록 하는 숏컷
passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());