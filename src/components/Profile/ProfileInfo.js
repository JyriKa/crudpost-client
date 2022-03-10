import { Box, Heading, Text } from "@chakra-ui/react"

const ProfileInfo = ({ user, posts }) => {
    return (
        <Box borderWidth='1px' padding='4' width='100%'>
            <Heading size='md'>Profile</Heading>
            <Text>Name: {user.name}</Text>
            <Text>Number of postings: {posts.length}</Text>
            <Text>Total amount of likes: {posts.reduce((sum, post) => sum + post.likes.length, 0)}</Text>
        </Box>
    )
}

export default ProfileInfo
