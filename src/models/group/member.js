import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: Number,
    },
    nickname: {
        type: String
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupChat'
    }
})

export default mongoose.model('Member', memberSchema);