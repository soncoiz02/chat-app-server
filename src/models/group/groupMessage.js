import mongoose, { Schema } from "mongoose";

const groupMessageSchema = new Schema({
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
    groupId: {
        type: String,
        required: true
    }

}, { timestamps: true })

export default mongoose.model('GroupMessage', groupMessageSchema);