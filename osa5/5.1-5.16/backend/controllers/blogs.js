const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.use(middleware.tokenExtractor);

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const user = request.user;

  if (!user) {
    return response.status(400).json({ error: 'Wrong or missing userId' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user.id,
  });

  if (blog.likes === undefined) {
    blog.likes = 0;
  }

  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).end();
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    if (blog.user.toString() !== request.user._id.toString()) {
      return response
        .status(401)
        .json({ error: 'Only the creator can delete this blog' });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
);

blogsRouter.post(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    if (blog.user.toString() !== request.user._id.toString()) {
      return response
        .status(401)
        .json({ error: 'Only the creator can update this blog' });
    }

    const updatedBlog = {
      title: request.body.title ?? blog.title,
      author: request.body.author ?? blog.author,
      url: request.body.url ?? blog.url,
      likes: request.body.likes ?? blog.likes,
    };

    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlog,
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    );

    response.status(200).json(result);
  }
);

module.exports = blogsRouter;
