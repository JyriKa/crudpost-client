import { Flex } from "@chakra-ui/react"
import Post from "./Post"

const PostHolder = ({ posts, setPosts }) => {
    if (!posts) <div>Loading...</div>

    const postElements = posts.map(post => <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />)

    return (
        <Flex direction='column' width='100%'>
            {postElements}
        </Flex>
    )
}

export default PostHolder
