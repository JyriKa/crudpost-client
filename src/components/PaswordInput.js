import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react"
import { useState } from "react"

const PasswordInput = ({value, setPassword, isInvalid}) => {
    const [show, setShow] = useState(false)

    return (
        <InputGroup size='md' mt='2'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={setPassword}
                isInvalid={isInvalid}
                value={value}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

export default PasswordInput
