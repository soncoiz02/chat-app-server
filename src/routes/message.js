import express from 'express'
import { getFriendMessages, getGroupMessage } from '../controllers/message'
import { verifyToken } from '../middlewares/verifyToken'

const route = express.Router()

route.get('/message/get-friend-messages', verifyToken, getFriendMessages)
route.get('/message/get-group-messages', verifyToken, getGroupMessage)

export default route