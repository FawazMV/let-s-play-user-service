import Axios from 'axios'
export const Axiosbooking = Axios.create({
    baseURL: 'http://54.206.59.235'
})

export const Axiosturf = Axios.create({
    baseURL: 'http://3.27.116.175'
})

export const AxiosReview = Axios.create({
    baseURL: 'http://localhost:9999'
})

export const AxiosReviw = Axios.create({
    baseURL: 'http://localhost:3.26.98.65'
})