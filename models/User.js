import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const UserScheme = new mongoose.Schema({
    name: String,
    email: String,
    avartarUrl: String,
    facebookId: Number,
    githubId: Number,
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }
});
// 소셜 아이디 정보를 저장하여 다른 소셜로 로그인 시도 시
// 이미 가입된 아이디가 있음을 알릴 수 있다.

UserScheme.plugin(passportLocalMongoose, {
    usernameField: 'email'
})

const model = mongoose.model("User", UserScheme)

export default model;