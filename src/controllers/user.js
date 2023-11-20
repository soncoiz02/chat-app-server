import jwtDecode from 'jwt-decode'
import mongoose from 'mongoose'
import Friend from '../models/friend'
import User from '../models/user'

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'email displayName avatar status').exec()
        res.json(users)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


export const getAllUsersNotFriend = async (req, res) => {
    try {
        const { token } = req
        const userId = jwtDecode(token)._id

        const otherPeople = await User.aggregate([
            {
                $lookup: {
                    from: 'friends',
                    foreignField: 'users.user',
                    localField: '_id',
                    as: 'friends'
                }
            },
            {
                $lookup: {
                    from: 'friendrequests',
                    foreignField: 'to',
                    localField: '_id',
                    as: 'requests',
                    pipeline: [
                        {
                            $match: {
                                from: { $eq: new mongoose.Types.ObjectId(userId) },
                            }
                        }
                    ]
                }
            },
            {
                $match: {
                    _id: { $ne: new mongoose.Types.ObjectId(userId) },
                    'friends.users.user': { $ne: new mongoose.Types.ObjectId(userId) }
                }
            },
            {
                $project: {
                    friends: 0,
                    __v: 0,
                    password: 0,
                    birthday: 0,
                    email: 0,
                }
            }
        ])

        res.json(otherPeople)

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}