import { Box, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getUserDataById } from "../../services/users"
import PostHolder from "../PostHolder/PostHolder"
import ProfileInfo from "./ProfileInfo"

const Profile = () => {
    const { id } = useParams()
    const [userData, setUserData] = useState(null)
    const [posts, setPost] = useState([])

    console.log(id)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const resUser = await getUserDataById(id)
                setPost(resUser.posts)
                setUserData(resUser)
            } catch (err) {
                console.log(err)
            }
        }
        fetchUserData()
    }, [])

    return (
        <Box width='100%'>
            {
                userData == null
                    ? 'loading...'
                    : <Flex direction='column'>
                        <ProfileInfo user={userData} posts={posts} />
                        <PostHolder posts={posts} setPosts={setPost} />
                    </Flex>
            }
        </Box>
    )
}

export default Profile
