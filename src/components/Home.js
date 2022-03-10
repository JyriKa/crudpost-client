import { Box, Button } from "@chakra-ui/react"
import { useContext } from "react"
import { UserContext } from "../App"
import { useNavigate } from "react-router"
import PostHolder from "./PostHolder/PostHolder"

const Home = ({ posts, setPosts }) => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const tryNavigatePostView = () => {
        if (user === null) {
            navigate('login')
            return
        }
        navigate('/newpost')
    }

    return (
        <Box width='100%'>
            <Button mt='5' width='100%' variant='outline' onClick={tryNavigatePostView}>Create Post</Button>
            <PostHolder posts={posts} setPosts={setPosts} />
        </Box>
    )
}

export default Home
