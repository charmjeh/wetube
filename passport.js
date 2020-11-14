import passport from "passport"; // 사용자 인증을 위한 라이브러리
import GithubStrategy from "passport-github";
import FacebookStrategy from 'passport-facebook'
import User from "./models/User";
import {
    facebookLoginCallback,
    githubLoginCallback
} from "./controllers/userController";
import routes from "./routes";

// 이미 구성이 된 paassport-local의 LocalStrategy를 생성합니다.
passport.use(User.createStrategy());

// 페이스북은 https 접근만을 허용하므로, 시험적으로 사용하기 위해서는
// tunnel을 이용하여 임의의 https 주소를 만들 수 있다.
passport.use(
    new GithubStrategy({
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECRET,
            callbackURL: `http://localhost:4000${routes.githubCallback}`
        },
        githubLoginCallback
    )
);
passport.use(
    new GithubStrategy({
            clientID: process.env.FB_ID,
            clientSecret: process.env.FB_SECRET,
            callbackURL: `https://sharp-jellyfish-43.loca.lt${routes.facebookCallback}`,
            profileFields: ['id', 'displayName', 'photos', 'email'],
            scope: ['public_profile', 'email']
        },
        facebookLoginCallback
    )
)

// 일반적으로 사용자 인증 시 쿠키에 user.id를 담고 그 아이디로 사용자를 식별하는 방식 사용
// serialization : 어떤 필드가 쿠키에 저장될지 알려주는 역할 (ex: userId)
// deserialization : 쿠키의 정보를 어떻게 사용자로 전환하는지 알려주는 역할
passport.serializeUser(User.serializeUser()) // 패스포트에게 쿠키에 user.id만 보내도록 지시함 
passport.deserializeUser(User.deserializeUser())