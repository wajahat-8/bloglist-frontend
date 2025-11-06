import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginservices from './services/login'
import Notification from './components/Notifications'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggalable from './components/Toggalable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null) // Renamed for clarity
  const [user, setUser] = useState(null)
  const blogRef=useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (text, type = 'error') => {
    setNotification({ text, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleLogin = async authUser => {

    try {
      const user = await loginservices.login(authUser)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)

      showNotification('Login successful!', 'success')
    } catch {
      showNotification('Wrong password or username', 'error')

    }
  }

  const handleNewBlog = async blogObject => {
    blogRef.current.toggleVisibility()

    try {
      const newBlog = await blogService.create( blogObject)
      setBlogs(blogs.concat(newBlog))

      showNotification(`New blog "${newBlog.title}" added!`, 'success')
    } catch (error) {
      console.log(error)
      showNotification('Error creating blog', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    showNotification('Logged out successfully', 'success')
  }
  const handleLike=async(blog) => {
    const updatedBlog={ ...blog,likes:blog.likes+1 }
    try{
      const returnedBlog=await blogService.update(blog.id,updatedBlog)
      setBlogs(blogs.map(b => b.id===blog.id?returnedBlog:b))
    }
    catch(error){
      console.error('Error updating likes:', error)
      showNotification('Error updating likes', 'error')
    }


  }
  const onDelete=async(blog) => {
    try{
      const confirmDelete=window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)
      if (!confirmDelete) return

      await blogService.remove(blog.id)
      showNotification(`Deleted "${blog.title}" successfully!`, 'success')


      setBlogs(blogs.filter(b => b.id!==blog.id))
    }
    catch(error){
      console.error('Error deleting the blog:', error)
      const backendMessage=error.response?.data?.error||'error deleting the blog'
      showNotification(backendMessage, 'error')
    }
  }
  if (user === null) {
    return (
      <Toggalable buttonLabel="Login">
        <LoginForm handleLogin={handleLogin}/>
      </Toggalable>
    )
  }

  return (
    <>
      <div>
        <h2>Create New</h2>
        <Notification message={notification} />
      </div>

      <div>
        <Toggalable buttonLabel="Add new Blog" ref={blogRef}>
          <BlogForm handleNewBlog={handleNewBlog}/>
        </Toggalable>
      </div>

      <div>
        <h2>blogs</h2>
        <p>{user.name} is logged in</p>
        <button onClick={handleLogout}>logout</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} onDelete={onDelete} />
        )}
      </div>
    </>
  )
}

export default App