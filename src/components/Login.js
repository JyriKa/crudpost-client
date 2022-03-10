import { Box, Button, Flex, Heading, Input, useToast } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../App"
import { login } from "../services/users"
import PasswordInput from "./PaswordInput"

const Login = () => {
    const { setUser } = useContext(UserContext) 
    const toast = useToast()
    const [name, setName] = useState('')
    const [isNameInvalid, setIsNameInvalid] = useState(false)
    const [password, setPassword] = useState('')
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)

    const nameSetter = ({ target }) => {
        setName(target.value)
        if (target.value.length < 3 || target.value.length > 16) {
            setIsNameInvalid(true)
            return
        }
        if (isNameInvalid) setIsNameInvalid(false)
    }

    const passwordSetter = ({ target }) => {
        setPassword(target.value)
        if (target.value.length < 5 || target.value.length > 64) {
            setIsPasswordInvalid(true)
            return
        }
        if (isPasswordInvalid) setIsPasswordInvalid(false)
    }

    const tryLogin = async () => {
        if (name === '' || password === '') {
            toast({
                title: 'No empty fields allowed',
                status: 'error',
                isClosable: true,
            })
            return
        }
        if (isNameInvalid || isPasswordInvalid) {
            toast({
                title: 'Invalid field or fields',
                status: 'error',
                isClosable: true,
            })
            return
        }

        const tryUser = {
            name,
            password: password
        }
        try {
            const resUser = await login(tryUser)
            localStorage.setItem("crudpostUser", JSON.stringify(resUser))
            setUser(resUser)
        } catch (err) {
            toast({
                title: 'Invalid name or password',
                status: 'error',
                isClosable: true,
            })
            setName('')
            setPassword('')
            return
        }
    }

    return (
        <Flex direction='column' width='100%' alignItems='center'>
            <Heading size='md' mb='12'>Login</Heading>
            <Input placeholder='username' mb='12' value={name} onChange={nameSetter} isInvalid={isNameInvalid} />
            <PasswordInput value={password} setPassword={passwordSetter} isInvalid={isPasswordInvalid} />
            <Box mt='12'>
                <Button onClick={tryLogin}>Login</Button>
            </Box>
            <Box mt='6'>
                <span>Need an account?</span>
                <Link to='/register' style={{ textDecoration: 'none', color: '#6978ae', marginLeft: '0.5em' }}>Register</Link>
            </Box>
        </Flex>
    )
}

export default Login
