// prettier-ignore-file

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import axios from 'axios'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [noti, setNoti] = useState('')

  let [user, setUser] = useState(null)

  const [blogCreationVisible, setBlogCreationVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))

    if (localStorage.getItem('user')) {
      setUser(localStorage.getItem('user'))
    }
  }, [])

  async function login() {
    try {
      const response = await axios.post('/api/login', {
        username,
        password
      })
      console.log(response)
      localStorage.setItem('user', response.data.token)
      localStorage.setItem('name', response.data.username)
      localStorage.setItem('userId', response.data.id)

      setUser(response.data.token)

      setUsername('')
      setPassword('')
    } catch {
      notification('Wrong username or password')
    }
  }

  function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('name')
    localStorage.removeItem('userId')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    await blogService.create(blogObject).then((returnedBlog) => {
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
    })
    await blogService.getAll().then((blogs) => setBlogs(blogs))
    setBlogCreationVisible(false)
    notification(`A new blog ${title} by ${author} added`)
  }

  function notification(message) {
    setNoti(message)
    setTimeout(() => setNoti(null), 3000)
  }

  function updateBlog() {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }

  if (user === null) {
    return (
      <div>
        {noti}
        <h2>Log in to application</h2>
        <form>
          <div>
            <p>Username:</p>
            <input
              placeholder="username"
              value={username}
              onChange={(x) => setUsername(x.target.value)}
            />
          </div>
          <div>
            <p>Password:</p>
            <input
              placeholder="password"
              value={password}
              onChange={(x) => setPassword(x.target.value)}
            />
          </div>
        </form>
        <button onClick={login}>Login</button>
      </div>
    )
  }

  return (
    <div>
      {noti}
      <h2>blogs</h2>
      <p>{localStorage.getItem('name')} logged in</p>
      <button onClick={logout}>Logout</button>
      {!blogCreationVisible && (
        <div>
          <button onClick={() => setBlogCreationVisible(true)}>New blog</button>
        </div>
      )}
      {blogCreationVisible && (
        <div>
          <BlogForm createBlog={addBlog} />
          <button onClick={() => setBlogCreationVisible(false)}>Cancel</button>
        </div>
      )}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => {
          return <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
        })}
    </div>
  )
}

export default App
