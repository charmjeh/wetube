import passport from 'passport' // 사용자 인증을 위한 라이브러리
import User from './models/User'

passport.use(User.createStrategy()) // 이미 구성이 된 paassport-local의 LocalStrategy를 생성합니다.

// 일반적으로 사용자 인증 시 쿠키에 user.id를 담고 그 아이디로 사용자를 식별하는 방식 사용
// serialization : 어떤 필드가 쿠키에 저장될지 알려주는 역할 (ex: userId)
// deserialization : 쿠키의 정보를 어떻게 사용자로 전환하는지 알려주는 역할
passport.serializeUser(User.serializeUser()) // 패스포트에게 쿠키에 user.id만 보내도록 지시함 
passport.deserializeUser(User.deserializeUser())