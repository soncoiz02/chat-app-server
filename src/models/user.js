import mongoose, { Schema } from "mongoose";
import { createHmac } from 'crypto';
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        required: true
    },
    birthday: {
        type: String
    },
    status: {
        type: Boolean,
        default: false,
    }
})

userSchema.methods = {
    authenticate(password) {
        return this.password === this.encryptPassword(password);
    },
    encryptPassword(password) {
        if (!password) return;
        try {
            // eslint-disable-next-line consistent-return
            return createHmac('Sha256', 'soncoiz02').update(password).digest('hex');
        } catch (error) {
            console.log(error);
        }
    },
}

userSchema.pre('save', function (next) {
    try {
        this.password = this.encryptPassword(this.password);
        next();
    } catch (error) {
        console.log(error);
    }
});

export default mongoose.model('User', userSchema);