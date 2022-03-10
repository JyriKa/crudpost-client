import {
    Avatar,
    Button,
    Flex,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal
} from "@chakra-ui/react"
import { useContext } from "react"
import { UserContext } from "../../App"

const UserNav = () => {
    const { user, setUser } = useContext(UserContext)

    const logout = () => {
        window.localStorage.removeItem('crudpostUser')
        setUser(null)
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Flex align='center' mr='4' fontSize='large'>
                    <Avatar size='sm' name={user.name} />
                </Flex>
            </PopoverTrigger>
            <Portal>
                <PopoverContent mr='2'>
                    <PopoverArrow />
                    <PopoverHeader>{user.name}</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                        <Button onClick={logout} size='sm' colorScheme='blue'>Sign out</Button>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}

export default UserNav
