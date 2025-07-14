const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;

  blogs.forEach((blog) => {
    likes += blog.likes;
  });

  return likes;
};

const favouriteBlog = (blogs) => {
  let favBlog = { likes: 0 };

  if (blogs.length === 0) {
    return {};
  }

  blogs.forEach((blog) => {
    if (blog.likes >= favBlog.likes) {
      favBlog = blog;
    }
  });
  return favBlog;
};

const mostBlogs = (blogs) => {
  let authors = [];

  if (blogs.length === 0) {
    return {};
  }

  blogs.forEach((blog) => {
    if (authors.length === 0) {
      authors.push({ author: blog.author, blogs: 1 });
    } else {
      let found = false;
      for (let i = 0; i < authors.length; i++) {
        if (authors[i].author === blog.author) {
          authors[i].blogs++;
          found = true;
          break;
        }
      }
      if (!found) {
        authors.push({ author: blog.author, blogs: 1 });
      }
    }
  });

  let authorWithMostblogs = authors[0];
  authors.forEach((author) => {
    if (author.blogs >= authorWithMostblogs.blogs) {
      authorWithMostblogs = author;
    }
  });

  return authorWithMostblogs;
};

const mostLikes = (blogs) => {
  let authors = [];

  if (blogs.length === 0) {
    return {};
  }

  blogs.forEach((blog) => {
    if (authors.length === 0) {
      authors.push({ author: blog.author, likes: 0 });
    } else {
      let found = false;
      for (let i = 0; i < authors.length; i++) {
        if (authors[i].author === blog.author) {
          authors[i].likes += blog.likes;
          found = true;
          break;
        }
      }
      if (!found) {
        authors.push({ author: blog.author, likes: blog.likes });
      }
    }
  });

  let authorWithMostLikes = authors[0];
  authors.forEach((author) => {
    if (author.likes >= authorWithMostLikes.likes) {
      authorWithMostLikes = author;
    }
  });

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
