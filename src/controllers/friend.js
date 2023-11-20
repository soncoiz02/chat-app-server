import jwtDecode from "jwt-decode";
import Friend from "../models/friend";
import FriendChat from "../models/friend/friendChat";
import User from "../models/user";
import mongoose from "mongoose";
import FriendMessage from "../models/friend/friendMessage";

export const addFriend = async (req, res) => {
    try {
        const { users } = req.body
        const friendData = {
            users: [
                {
                    user: users[0],
                },
                {
                    user: users[1],
                }
            ]
        }

        const existData = await Friend.findOne({
            users: {
                "$elemMatch": {
                    user: users[0]
                },
                "$elemMatch": {
                    user: users[1]
                }
            }
        }).exec()

        if (existData) {
            return res.status(400).json("Both of you are already friend")
        }

        const friend = await new Friend(friendData).save()

        const friendChatData = {
            users: friend._id,
            color: '6523e5250d0570225083e8e4'
        }

        const newChat = await new FriendChat(friendChatData).save()

        res.json({ friend, newChat })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { token } = req
        const { _id } = jwtDecode(token)

        const friends = await User.aggregate([
            {
                $lookup: {
                    from: 'friends',
                    foreignField: 'users.user',
                    localField: '_id',
                    as: 'friends'
                }
            },
            {
                $match: {
                    _id: { $ne: new mongoose.Types.ObjectId(_id) },
                    'friends.users.user': { $eq: new mongoose.Types.ObjectId(_id) }
                }
            },
            {
                $addFields: {
                    friendId: { $arrayElemAt: ["$friends._id", 0] }
                }
            },
            {
                $project: {
                    __v: 0,
                    email: 0,
                    password: 0,
                    friends: 0
                }
            }
        ])


        res.json(friends)

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const searchUserFriend = async (req, res) => {
    try {
        const { token } = req
        const { _id } = jwtDecode(token)
        const { keyword } = req.query

        const friends = await User.aggregate([
            {
                $lookup: {
                    from: 'friends',
                    foreignField: 'users.user',
                    localField: '_id',
                    as: 'friends'
                }
            },
            {
                $match: {
                    _id: { $ne: new mongoose.Types.ObjectId(_id) },
                    'friends.users.user': { $eq: new mongoose.Types.ObjectId(_id) },
                    displayName: { "$regex": keyword, "$options": "i" }
                }
            },
            {
                $addFields: {
                    friendId: { $arrayElemAt: ["$friends._id", 0] },
                }
            },
            {
                $project: {
                    __v: 0,
                    email: 0,
                    password: 0,
                    friends: 0
                }
            }
        ])


        res.json(friends)

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const getAllFriends = async (req, res) => {
    try {
        const allFriend = await Friend.find({})

        res.json(allFriend)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}