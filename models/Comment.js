import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: 'Text is required'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
    // video: { // how relate video and comment (방법 #2)
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: "Video" // which module
    // }
})

const model = mongoose.model("Comment", CommentSchema);
export default model;