import { Router } from "express";
import { acceptRequest, createRequest, getAllFriendRequest, removeRequest } from "../controllers/friendRequest";
import { verifyToken } from "../middlewares/verifyToken";

const route = Router()

route.get('/friend-request/get-alls', verifyToken, getAllFriendRequest)
route.post('/friend-request/create', verifyToken, createRequest)
route.put('/friend-request/accept', verifyToken, acceptRequest)
route.delete('/friend-request/remove/:id', verifyToken, removeRequest)

export default route