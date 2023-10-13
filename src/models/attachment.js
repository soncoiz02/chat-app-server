import mongoose, { Schema } from "mongoose";

const attachmentSchema = new Schema({
    type: {
        type: String,
    },
    content: {
        type: String,
    }
})

export default mongoose.model('Attachment', attachmentSchema);