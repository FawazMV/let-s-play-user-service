import usermodel from "../Models/User_Model.js"

export const getUsers = async (req, res) => {
    const data = await usermodel.find().catch(err => res.status(500).json(err))
    res.status(200).json(data)
}

export const getUsersCount = async (req, res) => {
    const data = await usermodel.count().catch(err => res.status(500).json(err))
    console.log(data)
    res.status(200).json(data)
}