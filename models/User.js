import mongoose from 'mongoose'
// passport-local-mongoose : 사용자 기능을 추가 (패스워드 변경, 확인, 생성, 암호화..처리)
import passportLocalMongoose from 'passport-local-mongoose'

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avartarUrl: String,
    facebookId: Number,
    githubId: Number,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }]
});
// 소셜 아이디 정보를 저장하여 다른 소셜로 로그인 시도 시
// 이미 가입된 아이디가 있음을 알릴 수 있다.

// 플러그인을 추가하고 설정 객체로 username을 email로 쓰도록 함
UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
})

const model = mongoose.model("User", UserSchema)

export default model;