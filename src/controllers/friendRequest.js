import jwtDecode from "jwt-decode";
import FriendRequest from "../models/friendRequest";

export const getAllFriendRequest = async (req, res) => {
    try {
        const userId = jwtDecode(req.token)._id
        const friendRequest = await FriendRequest.find({ to: userId }).exec()
        res.json(friendRequest)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const createRequest = async (req, res) => {
    try {
        const { from, to } = req.body

        const existRequest = await FriendRequest.findOne({
            from,
            to
        }).exec()

        if (existRequest) {
            return res.status(400).json({
                message: 'Friend request is exist!'
            })
        }

        const request = await new FriendRequest(req.body).save()
        res.json(request)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const acceptRequest = async (req, res) => {
    try {
        const accepted = await FriendRequest.findByIdAndUpdate(req.id, { status: 1 })
        res.json({
            status: 'Accepted'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const removeRequest = async (req, res) => {
    try {
        await FriendRequest.findByIdAndDelete(req.params.id).exec()
        res.json({
            message: 'Removed'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}