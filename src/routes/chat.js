import express from 'express'
import { verifyToken } from '../middlewares/verifyToken'
import { createGroupChat, getFriendChat, getGroupChat, getListGroupChat } from '../controllers/chat'

const route = express.Router()

route.get('/chat/get-friend-chat/:friendId', verifyToken, getFriendChat)
route.post('/chat/create-group', verifyToken, createGroupChat)
route.get('/chat/get-user-groups', verifyToken, getListGroupChat)
route.get('/chat/get-group-chat/:id', verifyToken, getGroupChat)

export default route