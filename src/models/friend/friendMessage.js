import mongoose, { Schema } from "mongoose";

const friendMessageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    attachment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attachment',
        default: null
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FriendChat',
    },
}, { timestamps: true })

export default mongoose.model('FriendMessage', friendMessageSchema);