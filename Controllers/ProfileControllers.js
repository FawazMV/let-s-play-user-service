import usermodel from "../Models/User_Model.js"

export const userDetails = async (req, res, next) => {
    const data = await usermodel.findById(req.user.id).catch(err => next(err))
    return res.status(200).json(data)
}

export const updateProfile = async (req, res, next) => {
    try {
        const { username, email, mobile } = req.body
        if(!username||!email||!mobile) return res.status(400).json({ message:"some fileds are missing"}) 
        const result = await usermodel.updateOne({ _id: req.user.id }, { $set: { username, email, mobile } }).catch(err => next(err))
        if (result) return res.status(200).json({ message: 'Profile updated successfully' })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error !" })
    }
}