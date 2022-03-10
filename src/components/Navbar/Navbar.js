import { Avatar, Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react"
import { useContext } from "react"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from "../../App"
import UserNav from "./UserNav"

const Navbar = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)

    return (
        <Flex backgroundColor='gray.600' color='gray.200'>
            <Box p='2' fontSize='x-large'>
                <NavLink to='/'>Crudpost</NavLink>
            </Box>
            <Spacer />
            {
                user == null ?
                    <Flex align='center' mr='4' fontSize='large'>
                        <NavLink to='/login' style={{ marginRight: '1em' }}>Login</NavLink>
                        <NavLink to='/register'>Register</NavLink>
                    </Flex>
                    : <UserNav />
            }
        </Flex>
    )
}

export default Navbar
