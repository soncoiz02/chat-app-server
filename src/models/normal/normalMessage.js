import mongoose, { Schema } from "mongoose";

const normalMessageSchema = new Schema({
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
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NormalChat',
    },

}, { timestamps: true })

export default mongoose.model('NormalMessage', normalMessageSchema);