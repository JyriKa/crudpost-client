import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

const newPost = async (authToken, newPost) => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${authToken}`}
    const response = await axios.post(baseUrl + '/authorized/newpost', newPost)
    return response.data
}

const likePost = async (authToken, id) => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${authToken}`}
    const response = await axios.put(`${baseUrl}/authorized/likepost/${id}`)
    return response.status
}

const getAllPosts = async () => {
    const response = await axios.get(baseUrl + '/getallposts')
    return response.data
}

const removePost = async (authToken, id) => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${authToken}`}
    const response = await axios.delete(`/authorized${baseUrl}/${id}`)
    return response.status
}

export {
    newPost,
    likePost,
    getAllPosts,
    removePost
}
