import mongoose, { Schema } from "mongoose";

const colorSchema = new Schema({
    name: {
        type: String,
    },
    color: {
        type: String,
    }
})

export default mongoose.model('Color', colorSchema);