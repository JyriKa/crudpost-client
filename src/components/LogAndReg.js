import { Box, Center, Flex } from "@chakra-ui/react"


const LogAndReg = ({ form }) => {
    return (
        <Flex borderWidth='1px' padding='4' width='100%' height='50vh' alignItems='center'>
                {form}
        </Flex>
    )
}

export default LogAndReg
