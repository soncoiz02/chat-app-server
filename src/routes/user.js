import { Router } from "express";
import { addFriend, getAllFriends, getUserFriends, searchUserFriend } from "../controllers/friend";
import { getAllUsers, getAllUsersNotFriend } from "../controllers/user";
import { verifyToken } from "../middlewares/verifyToken";

const route = Router()

route.get('/user/get-all', verifyToken, getAllUsers)
route.post('/user/add-friend', verifyToken, addFriend)
route.get('/user/get-user-friends', verifyToken, getUserFriends)
route.get('/user/get-all-friends', verifyToken, getAllFriends)
route.get('/user/search-user-friends', verifyToken, searchUserFriend)
route.get('/user/get-people-not-friend', verifyToken, getAllUsersNotFriend)

export default route