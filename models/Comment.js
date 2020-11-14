import mongoose from 'mongoose';

// 방법 #2 (* 방법 1은 video에서 확인)
// video: {
//  type: mongoose.Schema.Types.ObjectId, 
//  ref: "Video"
// } => how relate video and comment
// ref : from which module
const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: 'Text is required'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const model = mongoose.model("Comment", CommentSchema);
export default model;