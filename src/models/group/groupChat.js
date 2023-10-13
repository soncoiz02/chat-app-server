import mongoose, { Schema } from "mongoose";

const groupChatSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color'
    }
})

export default mongoose.model('GroupChat', groupChatSchema);