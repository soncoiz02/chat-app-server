import mongoose, { Schema } from "mongoose";

const groupChatSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
        default: new mongoose.Types.ObjectId('6523e5250d0570225083e8e4')
    }
})

export default mongoose.model('GroupChat', groupChatSchema);