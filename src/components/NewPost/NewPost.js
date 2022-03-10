import { Button, Flex, Heading, Input, Textarea, useToast } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { UserContext } from "../../App"
import { newPost } from "../../services/posts"

const NewPost = ({ posts, setPosts }) => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const toast = useToast()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const tryCreatePost = async () => {
        if (title === '' || content === '') {
            toast({
                title: 'No empty fields allowed',
                status: 'error',
                isClosable: true,
            })
            return
        }
        if (title.length > 20) {
            toast({
                title: 'Title maximum length is 20',
                status: 'error',
                isClosable: true,
            })
            return
        }
        if (title.length > 200) {
            toast({
                title: 'Content maximum length is 200',
                status: 'error',
                isClosable: true,
            })
            return
        }
        try {
            const resPost = await newPost(user.token, { title, content })
            setPosts([resPost, ...posts])
        } catch (err) {
            toast({
                title: 'Error on creating post',
                status: 'error',
                isClosable: true,
            })
            return
        }
        toast({
            title: 'New post created!',
            status: 'success',
            isClosable: true,
        })
        navigate('/')
    }

    return (
        <Flex
            direction='column'
            width='100%'
            alignItems='center'
            borderWidth='1px' padding='4'
            height='50vh'
        >
            <Heading size='md' mb='12'>New Post</Heading>
            <Input
                placeholder='Title'
                value={title}
                onChange={({ target }) => setTitle(target.value)}
            />
            <Textarea
                mt='6'
                size='lg'
                placeholder='Content'
                value={content}
                onChange={({ target }) => setContent(target.value)}
            />
            <Button onClick={tryCreatePost} mt='6'>Create</Button>
        </Flex>
    )
}

export default NewPost
