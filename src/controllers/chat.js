import jwtDecode from "jwt-decode"
import FriendChat from "../models/friend/friendChat"
import GroupChat from "../models/group/groupChat"
import Member from "../models/group/member"
import mongoose from "mongoose"

export const createFriendChat = async (req, res) => {
    try {
        await FriendChat(req.body).save()
        res.json({
            message: 'Create friend chat success!'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

export const getFriendChat = async (req, res) => {
    try {
        const chat = await FriendChat.findOne({
            users: req.params.friendId
        }).populate(
            {
                path: 'users',
                model: 'Friend',
                populate: {
                    path: 'users.user',
                    model: 'User'
                }
            }
        ).exec()
        res.json(chat)
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

// -----------------------------------------------------------------------------

const createMember = async (user, groupId, currentUserId) => {
    const isAuthor = currentUserId === user
    try {
        const memberData = {
            user,
            groupId,
            role: isAuthor ? 1 : 0,
            nickname: ""
        }
        await Member(memberData).save()
    } catch (error) {
        console.log(error);
    }
}

export const createGroupChat = async (req, res) => {
    try {
        const { title, member } = req.body
        const currentUserId = jwtDecode(req.token)._id
        const newGroup = await GroupChat({ title }).save()
        await Promise.all(member.map(item => createMember(item, newGroup._id, currentUserId)))
        res.json(newGroup)
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

export const getListGroupChat = async (req, res) => {
    try {
        const currentUserId = jwtDecode(req.token)._id
        const groupChat = await GroupChat.aggregate([
            {
                $lookup: {
                    from: 'members',
                    foreignField: 'groupId',
                    localField: '_id',
                    as: 'members'
                }
            },
            {
                $match: {
                    'members.user': { $eq: new mongoose.Types.ObjectId(currentUserId) }
                }
            }
        ])
        res.json(groupChat)
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

export const getGroupChat = async (req, res) => {
    try {
        const { id } = req.params
        const group = await GroupChat.findById(id).exec()
        const groupMembers = await Member.find({ groupId: id }).populate({
            path: 'user',
            model: 'User'
        }).exec()
        const groupData = {
            ...group._doc,
            members: groupMembers
        }
        res.json(groupData)
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}