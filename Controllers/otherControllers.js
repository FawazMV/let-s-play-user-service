import { AxiosReview as axios } from "../Helpers/Axiosinstance.js"

export const reviewSubmit = async (req, res) => {
    try {
        const { data } = await axios.post('/review-submit', { ...req.body, user: req.user.id })
        if (data) return res.status(200).json(data)
        console.log(req.body)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}