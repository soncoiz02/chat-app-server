import express from "express";
import { createColor, getColor, getColors } from "../controllers/color";

const route = express.Router()

route.get('/colors', getColors)
route.get('/color/:id', getColor)
route.post('/color', createColor)

export default route