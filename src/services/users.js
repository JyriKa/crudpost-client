import axios from "axios"

const baseUrl = process.env.REACT_APP_BASE_URL

const getUserDataById = async (id) => {
    const response = await axios.get(`${baseUrl}/user/${id}`)
    return response.data
}

const register = async (user) => {
    const response = await axios.post(`${baseUrl}/register`, user)
    return response.data
}

const login = async (user) => {
    const response = await axios.post(`${baseUrl}/login`, user)
    return response.data
}

export {
    getUserDataById,
    register,
    login
}
