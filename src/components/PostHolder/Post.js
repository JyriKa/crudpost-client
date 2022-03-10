import { Badge, Box, Center, Container, Divider, Flex, IconButton, Spacer, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../App"
import IconThumbUp from "../../Icons/IconThumbUp"
import { likePost } from "../../services/posts"

const Post = ({ post, posts, setPosts }) => {
    const { user } = useContext(UserContext)

    const tryLike = async () => {
        if (!user) return

        if (post.likes.includes(user.id)) return

        setPosts(posts.map(p => {
            if (post.id === p.id) {
                return { ...p, likes: p.likes.concat(user.id) }
            }
            return p
        }))

        try {
            await likePost(user.token, post.id)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Box borderWidth='1px' marginTop='1em' padding='1em' width='100%'>
            <Box
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                isTruncated
                marginLeft='2'
            >
                {post.title}
            </Box>
            <Divider />
            <Center mt='7' mb='7'>
                <Container>
                    {post.content}
                </Container>
            </Center>
            <Flex alignItems='center'>
                <IconButton 
                onClick={tryLike} 
                aria-label='like post' 
                disabled={!user || post.likes.includes(user.id) ? true : false} 
                size='sm' 
                icon={<IconThumbUp />} 
                />
                <Badge ml='1' colorScheme='green'>{post.likes.length}</Badge>
                <Spacer />
                <Text>By: </Text>
                <Link to={`user/${post.creator}`} style={{textDecoration: 'underline'}} >{post.createdBy}</Link>
            </Flex>
        </Box>
    )
}

export default Post
