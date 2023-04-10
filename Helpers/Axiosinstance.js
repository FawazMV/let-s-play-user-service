import Axios from 'axios'
export const Axiosbooking = Axios.create({
    baseURL: 'https://let-s-play-booking-service.onrender.com'
})

export const Axiosturf = Axios.create({
    baseURL: 'https://let-s-play-turf-service.onrender.com'
})

export const AxiosReview = Axios.create({
    baseURL: 'https://let-s-play-review-service.onrender.com'
})

