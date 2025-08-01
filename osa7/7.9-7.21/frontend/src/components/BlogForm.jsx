import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h1>Create new</h1>
      <div>
        Title:
        <input
          placeholder="title"
          value={title}
          onChange={(x) => setTitle(x.target.value)}
        />
      </div>
      <div>
        author:
        <input
          placeholder="author"
          value={author}
          onChange={(x) => setAuthor(x.target.value)}
        />
      </div>
      <div>
        url:
        <input
          placeholder="url"
          value={url}
          onChange={(x) => setUrl(x.target.value)}
        />
      </div>
      <button onClick={addBlog}>Create</button>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func,
};

export default BlogForm;
