import FriendMessage from "../models/friend/friendMessage";
import GroupMessage from "../models/group/groupMessage";

export const saveFriendMessage = async (messageData) => {
    try {
        await FriendMessage(messageData).save()
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

export const getFriendMessages = async (req, res) => {
    try {
        const { chatId, page } = req.query
        const limit = 10
        const skip = (+page - 1) * limit
        const message = await FriendMessage.find({ chatId }).limit(limit).skip(skip).sort([['createdAt', -1]]).exec()
        const countMessage = await FriendMessage.countDocuments({ chatId }).exec()
        res.json({
            message,
            total: countMessage
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

export const getGroupMessage = async (req, res) => {
    try {
        const { groupId, page } = req.query
        const limit = 10
        const skip = (+page - 1) * limit
        const message = await GroupMessage.find({ groupId }).limit(limit).skip(skip).sort([['createdAt', -1]]).exec()
        const countMessage = await GroupMessage.countDocuments({ groupId }).exec()
        res.json({
            message,
            total: countMessage
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}