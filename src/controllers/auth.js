import Jwt from 'jsonwebtoken';
import User from '../models/user';

export const register = async (request, response) => {
    const { email, password, displayName } =
        request.body;
    try {
        const exitUser = await User.findOne({ email }).exec();

        if (exitUser) {
            return response.status(400).json({
                field: 'email',
                message: 'Account has exist',
            });
        }
        const user = await new User({
            email,
            password,
            displayName,
            avatar: "https://i.pravatar.cc/300",
            status: true,
            birthday: null
        }).save();

        const token = Jwt.sign({ _id: user.id }, '123456', {
            expiresIn: 60 * 60 * 24,
        });

        response.json({
            accessToken: token,
            userInfo: {
                displayName: user.displayName,
                birthday: user.birthday,
                email: user.email,
                avatar: user.avatar,
                status: user.status
            },
        });
    } catch (error) {
        response.status(400).json({
            message: error.message,
        });
    }
};

export const login = async (request, response) => {
    const { email, password } = request.body;
    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return response.status(400).json({
                field: 'email',
                message: 'Wrong email!',
            });
        }
        if (!user.authenticate(password)) {
            return response.status(400).json({
                field: 'password',
                message: 'Wrong password!',
            });
        }

        const token = Jwt.sign({ _id: user.id }, '123456', {
            expiresIn: 60 * 60 * 24,
        });

        response.json({
            accessToken: token,
            userInfo: {
                displayName: user.displayName,
                birthday: user.birthday,
                email: user.email,
                avatar: user.avatar,
                status: user.status
            },
        });

    } catch (error) {
        response.status(400).json({
            message: error.message,
        });
    }
};
