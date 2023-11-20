import mongoose, { Schema } from "mongoose";

const friendRequestSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Number,
        required: true,
        default: 0
    }
})

export default mongoose.model('FriendRequest', friendRequestSchema)