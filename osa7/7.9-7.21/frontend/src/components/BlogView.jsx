import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { setNotification } from '../reducers/notificationReducer';
import {
  removeBlog,
  updateBlog,
  getBlogs,
  addComment,
} from '../reducers/blogReducer';

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

const commentStyle = {
  color: 'black',
  textDecoration: 'none',
  marginRight: '15px',
  fontWeight: 'bold',
};

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const BlogView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  if (!blog) return <div>Loading...</div>;

  async function addLike(blogToBeUpdated) {
    console.log(blogToBeUpdated);
    const newBlog = {
      user: blogToBeUpdated.user[0].id,
      likes: blogToBeUpdated.likes + 1,
      author: blogToBeUpdated.author,
      title: blogToBeUpdated.title,
      url: blogToBeUpdated.url,
    };
    await dispatch(updateBlog(blogToBeUpdated, newBlog));
    dispatch(getBlogs());
  }

  async function blogRemove(blog) {
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (confirmed) {
      await dispatch(removeBlog(blog.id));
      dispatch(getBlogs());
      dispatch(
        setNotification(`Blog ${blog.title} by ${blog.author} removed`, 5)
      );
      navigate('/');
    }
  }

  function addNewComment(event) {
    event.preventDefault();
    dispatch(addComment(id, comment));
    dispatch(getBlogs());
    setComment('');
  }

  const userId = localStorage.getItem('userId');

  return (
    <div className="blog" style={blogStyle}>
      <h3>
        {blog.title} by {blog.author}
      </h3>
      <p>{blog.url}</p>
      <p>
        Likes: {blog.likes}{' '}
        <button style={buttonStyle} onClick={() => addLike(blog)}>
          Like
        </button>
      </p>
      <p>Added by {blog.user[0]?.username ?? 'unknown'}</p>
      {blog.user[0]?.id === userId && (
        <button style={buttonStyle} onClick={() => blogRemove(blog)}>
          Remove
        </button>
      )}
      <h3>Comments:</h3>
      <div>
        <form onSubmit={addNewComment}>
          <input
            style={inputStyle}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button style={buttonStyle} type="submit">
            Add comment
          </button>
        </form>
        <ul style={commentStyle}>
          {blog.comments.map((comment, u) => (
            <div key={u}>
              <li>{comment}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogView;
