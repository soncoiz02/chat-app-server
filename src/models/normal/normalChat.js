import mongoose, { Schema } from "mongoose";

const normalChatSchema = new Schema({
    users: [
        {
            userInfo: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            nickname: {
                type: String
            }
        }
    ],
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color'
    }
})

export default mongoose.model('NormalChat', normalChatSchema);