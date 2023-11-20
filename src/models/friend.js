import mongoose, { Schema } from "mongoose";

const friendSchema = new Schema({
    users: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        nickname: {
            type: String,
            default: ''
        }
    }]
})

export default mongoose.model('Friend', friendSchema);