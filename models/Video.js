import mongoose from 'mongoose';

// required가 충족되지 못하면 발생하는 에러메시지를 함께 작성함.
const VideoSchema = new mongoose.Schema({ // definition (the shape of data on DB)
    fileUrl: {
        type: String,
        required: 'File URL is required'
    },
    title: {
        type: String,
        required: 'Title is Required'
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{ // how relate video and comment (방법 #1)
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    create: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const model = mongoose.model('Video', VideoSchema)
export default model;