import Color from "../models/color";

export const createColor = async (req, res) => {
    try {
        const color = await new Color(req.body).save()
        res.json(color)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getColors = async (req, res) => {
    try {
        const colors = await Color.find({}).exec()
        res.json(colors)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getColor = async (req, res) => {
    try {
        const color = await Color.findById(req.params.id).exec()
        res.json(color)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }