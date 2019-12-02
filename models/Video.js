import mongoose, { mongo } from 'mongoose';

const VideoSchema = new mongoose.Schema({  // definition (the shape of data on DB)
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
    }]
});

const model = mongoose.model('Video', VideoSchema)
export default model;