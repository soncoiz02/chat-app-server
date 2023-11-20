import mongoose, { Schema } from "mongoose";

const friendChatSchema = new Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend'
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color'
    }
})

export default mongoose.model('FriendChat', friendChatSchema);