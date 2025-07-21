/* eslint-disable indent */
// prettier-ignore-file

import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  async function addLike(blogToBeUpdated) {
    const newBlog = {
      user: blogToBeUpdated.user,
      likes: blogToBeUpdated.likes + 1,
      author: blogToBeUpdated.author,
      title: blogToBeUpdated.title,
      url: blogToBeUpdated.url
    }
    blogService.update(blogToBeUpdated.id, newBlog).then((response) => {
      console.log(response)
      updateBlog(response)
    })
  }

  async function removeBlog(id) {
    blogService.remove(id).then((response) => {
      console.log(response)
      updateBlog(response)
    })
  }

  const [showTinyBlog, setShowTinyBlog] = useState(true)
  if (showTinyBlog) {
    return (
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={() => setShowTinyBlog(false)}>View</button>
      </div>
    )
  }
  if (!showTinyBlog) {
    console.log(blog)
    return (
      <div className="blog" style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setShowTinyBlog(true)}>Hide</button>
        <div>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes} <button onClick={() => addLike(blog)}>Like</button>
          </p>
          <p>
            {blog.user && blog.user[0] && blog.user[0].username ? blog.user[0].username : 'unknown'}
          </p>
        </div>
        {blog.user &&
          blog.user[0] &&
          blog.user[0].id &&
          localStorage.getItem('userId') === blog.user[0].id && (
            <button
              onClick={() => {
                const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
                if (confirmed) {
                  removeBlog(blog.id)
                }
              }}
            >
              Remove
            </button>
          )}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
    likes: PropTypes.number.isRequired,
    user: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          id: PropTypes.string,
          username: PropTypes.string
        })
      ])
    )
  }).isRequired,
  updateBlog: PropTypes.func.isRequired
}

export default Blog
