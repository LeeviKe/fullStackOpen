import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { getBlogs, createBlog } from './reducers/blogReducer';
import { setUser, clearUser } from './reducers/userReducer';

import Blog from './components/Blog';
import BlogView from './components/BlogView';
import Users from './components/Users';
import User from './components/User';
import BlogForm from './components/blogForm';

const navStyle = {
  background: '#222',
  padding: '10px 20px',
  marginBottom: '20px',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  marginRight: '15px',
  fontWeight: 'bold',
};

const buttonStyle = {
  background: '#007bff',
  border: 'none',
  color: 'white',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: '10px',
};

const inputStyle = {
  padding: '6px 8px',
  margin: '5px 0 15px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '200px',
};

const notificationStyle = {
  backgroundColor: '#007bff',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '4px',
  color: 'white',
  fontWeight: 'bold',
};

const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const user = useSelector((state) => state.user);

  const [blogCreationVisible, setBlogCreationVisible] = useState(false);

  useEffect(() => {
    dispatch(getBlogs());

    if (localStorage.getItem('user')) {
      dispatch(setUser(localStorage.getItem('user')));
    }
  }, [dispatch]);

  async function login() {
    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });
      console.log(response);
      localStorage.setItem('user', response.data.token);
      localStorage.setItem('name', response.data.username);
      localStorage.setItem('userId', response.data.id);

      dispatch(setUser(response.data.token));

      setUsername('');
      setPassword('');
    } catch {
      dispatch(setNotification('Wrong username or password', 5));
    }
  }

  const addBlog = async (blogObject) => {
    await dispatch(createBlog(blogObject));
    dispatch(getBlogs());
    setBlogCreationVisible(false);
    dispatch(
      setNotification(
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
        5
      )
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form>
          <div>
            <p>Username:</p>
            <input
              style={inputStyle}
              placeholder="username"
              value={username}
              onChange={(x) => setUsername(x.target.value)}
            />
          </div>
          <div>
            <p>Password:</p>
            <input
              style={inputStyle}
              placeholder="password"
              value={password}
              onChange={(x) => setPassword(x.target.value)}
            />
          </div>
        </form>
        <button style={buttonStyle} onClick={login}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      {!blogCreationVisible && (
        <div>
          <button
            style={buttonStyle}
            onClick={() => setBlogCreationVisible(true)}
          >
            New blog
          </button>
        </div>
      )}
      {blogCreationVisible && (
        <div>
          <BlogForm createBlog={addBlog} />
          <button onClick={() => setBlogCreationVisible(false)}>Cancel</button>
        </div>
      )}

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => {
          return <Blog key={blog.id} blog={blog} />;
        })}
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    dispatch(clearUser());
  }

  return (
    <div>
      <Router>
        <div style={navStyle}>
          <div>
            {' '}
            <Link style={linkStyle} to="/">
              Blogs
            </Link>{' '}
            <Link style={linkStyle} to="/users">
              Users
            </Link>{' '}
          </div>
          <div>
            {localStorage.getItem('name')} logged in{' '}
            <button style={buttonStyle} onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        {notification && <div style={notificationStyle}>{notification}</div>}{' '}
        <h2>Blog app</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
