import { Box, Button, Flex, Heading, Input, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { register } from "../services/users"
import PasswordInput from "./PaswordInput"


const Register = () => {
    const toast = useToast()
    const [name, setName] = useState('')
    const [isNameInvalid, setIsNameInvalid] = useState(false)
    const [password1, setPassword1] = useState('')
    const [isPassword1Invalid, setIsPassword1Invalid] = useState(false)
    const [password2, setPassword2] = useState('')
    const [isPassword2Invalid, setIsPassword2Invalid] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false) 

    const tryRegister = async () => {
        if (name === '' || password1 === '' || password2 === '') {
            toast({
                title: 'No empty fields allowed',
                status: 'error',
                isClosable: true,
            })
            return
        }
        if (isNameInvalid || isPassword1Invalid || isPassword2Invalid) {
            toast({
                title: 'Invalid field or fields',
                status: 'error',
                isClosable: true,
            })
            return
        }

        const newUser = {
            name,
            password: password1
        }
        try {
            await register(newUser)
        } catch (err) {
            toast({
                title: 'Name already taken',
                status: 'error',
                isClosable: true,
            })
            setIsNameInvalid(true)
            return
        }
        toast({
            title: 'Registration was succesful!',
            status: 'success',
            isClosable: true,
        })
        setIsButtonDisabled(true)
    }

    const nameSetter = ({ target }) => {
        setName(target.value)
        if (target.value.length < 3 || target.value.length > 16) {
            setIsNameInvalid(true)
            return
        }
        if (isNameInvalid) setIsNameInvalid(false)
    }

    const password1Setter = ({ target }) => {
        if (target.value === password2) {
            setIsPassword2Invalid(false)
        }
        setPassword1(target.value)
        if (target.value.length < 5 || target.value.length > 64) {
            setIsPassword1Invalid(true)
            return
        }
        if (isPassword1Invalid) setIsPassword1Invalid(false)
    }

    const password2Setter = ({ target }) => {
        setPassword2(target.value)
        if (target.value !== password1) {
            setIsPassword2Invalid(true)
            return
        }
        if (isPassword2Invalid) setIsPassword2Invalid(false)
    }

    return (
        <Flex direction='column' width='100%' alignItems='center'>
            <Heading size='md' mb='12'>Register</Heading>
            <Input
                isInvalid={isNameInvalid}
                placeholder='username' mb='12'
                onChange={nameSetter}
            />
            <PasswordInput value={password1} setPassword={password1Setter} isInvalid={isPassword1Invalid} />
            <PasswordInput value={password2} setPassword={password2Setter} isInvalid={isPassword2Invalid} />
            <Box mt='12'>
                <Button onClick={tryRegister} isDisabled={isButtonDisabled}>Register</Button>
            </Box>
            <Box mt='6'>
                <span>Have an account?</span>
                <Link to='/login' style={{ textDecoration: 'none', color: '#6978ae', marginLeft: '0.5em' }}>Log In</Link>
            </Box>
        </Flex>
    )
}

export default Register
