import { createContext, useEffect, useState } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { Navigate, Route, Routes } from "react-router"
import { getAllPosts } from './services/posts'
import Home from './components/Home'
import Navbar from './components/Navbar/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import LogAndReg from './components/LogAndReg'
import { Center, Flex } from '@chakra-ui/react'
import useWindowDimensions from './useWindowsDimensions'
import NewPost from './components/NewPost/NewPost'
import Profile from './components/Profile/Profile'

export const UserContext = createContext({});

const App = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const userJSON = window.localStorage.getItem('crudpostUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      const resPosts = await getAllPosts()
    if (resPosts) setPosts(resPosts)
    }
    fetchPosts()
  }, [])

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Center width='100%'>
          <Flex width={width > 600 ? '40%' : '95%'}>
            <Routes>
              <Route path='/newpost' element={user === null ?
                <Navigate to='/login' />
                : <NewPost posts={posts} setPosts={setPosts} />}
              />
              <Route path='/register'
                element={user === null ?
                  <LogAndReg form={<Register />} />
                  : <Navigate to='/' />}
              />
              <Route
                path='/login' element={user === null ?
                  <LogAndReg form={<Login />} />
                  : <Navigate to='/' />}
              />
              <Route path='/user/:id' element={<Profile />} />
              <Route path='/' element={<Home posts={posts} setPosts={setPosts} />} />
            </Routes>
          </Flex>
        </Center>
      </UserContext.Provider>
    </Router>
  )
}

export default App;
