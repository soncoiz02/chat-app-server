import mongoose, { Schema } from "mongoose";

const friendSchema = new Schema({
    userId: {
        type: String,
    },
    friendId: {
        type: String,
    }
})

export default mongoose.model('Friend', friendSchema);