import mongoose from 'mongoose';

// mongoose.Schema.Types.ObjectId : how relate video and comment (방법 #2 : * 방법 1은 video에서 확인)
// ref : from which module
const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: 'Text is required'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
    // video: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Video"
    // }
})

const model = mongoose.model("Comment", CommentSchema);
export default model;