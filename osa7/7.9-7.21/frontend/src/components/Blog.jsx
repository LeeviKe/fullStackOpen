import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const blogStyle = {
  background: 'white',
  border: '1px solid #ddd',
  padding: '15px',
  marginBottom: '15px',
  borderRadius: '6px',
};

const linkStyle = {
  color: 'black',
  textDecoration: 'none',
  marginRight: '15px',
  fontWeight: 'bold',
};

const Blog = ({ blog }) => {
  return (
    <div style={blogStyle} className="blog">
      <Link style={linkStyle} to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          id: PropTypes.string,
          username: PropTypes.string,
        }),
      ])
    ),
  }).isRequired,
  updateBlog: PropTypes.func,
};

export default Blog;
