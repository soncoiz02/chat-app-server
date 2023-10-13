import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String
    },
    nickname: {
        type: String
    },
    groupId: {
        type: String,
        required: true
    }
})

export default mongoose.model('Member', memberSchema);