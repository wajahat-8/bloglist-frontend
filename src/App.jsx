import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginservices from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const[ errormessage,setErrorMessage]=useState(null)
  const [username, setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [user,setUser]=useState(null)
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(()=>{
    const loggedUserJSON=window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])
  const handleLogin=async event =>{
    event.preventDefault()
    try{
      const user=await loginservices.login({username,password})
      window.localStorage.setItem(
        'loggedBlogUser',JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch{
      setErrorMessage('wrong credentials')
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
      setUsername('')
      setPassword('')
    }
  
  }
  const handleNewBlog=async event=>{
    event.preventDefault;
    try{
    const newBlog=await  blogService.create({title,author,url})
    setBlogs(blogs.concat(newBlog))
  }
  catch(error){
console.log(error)
  }
}
  if(user==null){
    return(
       <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username <input type="text" value={username} 
            onChange={({target})=>setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label >
            password <input type="text" value={password}
            onChange={({target})=>setPassword(target.value)}
            />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
      </div>


    )
  }

  return (
    <>
   <div>
      <h2>Create New</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <label>
            tittle:<input type='text' required value={title} onChange={({target})=>setTitle(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            author:<input type='text' required value={author} onChange={({target})=>setAuthor(target.value)}/>
          </label>
        </div>
        <div>
          <label>
           Url:<input type='text' required value={url} onChange={({target})=>setUrl(target.value)}/>
          </label>
        </div>
        <button type='sbmit'>Create</button>
      </form>
  </div>

   <div>
      <h2>blogs</h2>
      <p>{user.name} was logged in</p> <button
  onClick={() => {
    localStorage.removeItem('loggedBlogUser');
    setUser(null); // use null to clear the user state
  }}
>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    </>
  )
}

export default App