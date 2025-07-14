const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const blogs = [
  {
    _id: '685f1d31d1d3aa2e43a8faef',
    title: 'Matin seikkailut',
    author: 'Leevi',
    url: 'www.illegalYoutube.com',
    likes: 92,
    __v: 0,
    user: [{ _id: '687558cdfb919bbd530c0270', username: 'test', name: 'test' }],
  },
  {
    _id: '685f46a9e73bde505b899ab3',
    title: 'Jaskan kokkituokio',
    author: 'Jaska',
    url: 'www.food.fi',
    likes: 100,
    __v: 0,
    user: [{ _id: '687558cdfb919bbd530c0270', username: 'test', name: 'test' }],
  },
  {
    _id: '685f999cae1a2d3499af1122',
    title: 'Nordic Nights',
    author: 'Jaska',
    url: 'www.arctictravel.fi',
    likes: 58,
    __v: 0,
    user: [{ _id: '687558cdfb919bbd530c0270', username: 'test', name: 'test' }],
  },
  {
    _id: '685f999cb4fa6edbac11ddee',
    title: 'Leevi’s Deep Thoughts',
    author: 'Leevi',
    url: 'www.brainwaves.com',
    likes: 73,
    __v: 0,
    user: [{ _id: '687558cdfb919bbd530c0270', username: 'test', name: 'test' }],
  },
  {
    _id: '685faaa111edc00812baa912',
    title: 'Functional Programming Rocks',
    author: 'Ada',
    url: 'www.codequeen.org',
    likes: 204,
    __v: 0,
    user: [{ _id: '687558cdfb919bbd530c0270', username: 'test', name: 'test' }],
  },
  {
    _id: '685faaa211fdc00812b22122',
    title: 'Grilling with Jaska',
    author: 'Jaska',
    url: 'www.meatmasters.fi',
    likes: 94,
    __v: 0,
    user: [{ _id: '687558cdfb919bbd530c0270', username: 'test', name: 'test' }],
  },
  {
    _id: '685faabc12ffb003112aa342',
    title: 'Mountains and Mindfulness',
    author: 'Ella',
    url: 'www.zensteps.fi',
    likes: 61,
    __v: 0,
    user: [{ _id: '687558cdfb919bbd530c0270', username: 'test', name: 'test' }],
  },
  {
    _id: '685fabcd43fed1122adc9988',
    title: 'Back to Basics',
    author: 'Linus',
    url: 'www.kernelchronicles.fi',
    likes: 129,
    __v: 0,
    user: [{ _id: '687558cdfb919bbd530c0270', username: 'test', name: 'test' }],
  },
];

let token;

beforeEach(async () => {
  await Blog.deleteMany({});

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'test', password: 'test' });

  token = loginResponse.body.token;

  for (const blog of blogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('All blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, blogs.length);
});

test('Blog identifiers are "id"', async () => {
  const response = await api.get('/api/blogs');

  response.body.forEach((blog) => {
    assert.strictEqual(blog._id, undefined);
    assert.notStrictEqual(blog.id, undefined);
  });
});

test('Adding blogs works', async () => {
  const blog = {
    title: 'Maken blogi',
    author: 'TestiMake',
    url: 'www.make.com',
    likes: 32,
  };

  const responseBeforeAdding = await api.get('/api/blogs');

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const responseAfterAdding = await api.get('/api/blogs');

  assert.strictEqual(
    responseBeforeAdding.body.length + 1,
    responseAfterAdding.body.length
  );
});

test('If there was no value given for likes, it gets the value of 0', async () => {
  const blog = {
    title: 'Maken blogi',
    author: 'TestiMake',
    url: 'www.make.com',
  };

  const responseBeforeAdding = await api.get('/api/blogs');

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const responseAfterAdding = await api.get('/api/blogs');

  assert.strictEqual(
    responseAfterAdding.body[responseAfterAdding.body.length - 1].likes,
    0
  );
});

test('If new blog does not have value for "title", return 400 Bad Request', async () => {
  const blog = {
    author: 'TestiMake',
    url: 'www.make.com',
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blog)
    .expect(400);
});

test('If new blog does not have value for "url", return 400 Bad Request', async () => {
  const blog = {
    title: 'Maken kokkailut',
    author: 'TestiMake',
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blog)
    .expect(400);
});

test('If new blog does not have value for both "title" and "url", return 400 Bad Request', async () => {
  const blog = {
    author: 'TestiMake',
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blog)
    .expect(400);
});

test('Deleting a blog works', async () => {
  const responseBeforeDeleting = await api.get('/api/blogs');

  const deleteId = responseBeforeDeleting.body[0].id;

  await api
    .delete(`/api/blogs/${deleteId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204);

  const responseAfterDeleting = await api.get('/api/blogs');

  assert.strictEqual(
    responseBeforeDeleting.body.length,
    responseAfterDeleting.body.length + 1
  );
});

describe('Tests for updating', () => {
  test('Updating every item in a blog works', async () => {
    const blog = {
      title: 'Maken seikkailut osa 4',
      author: 'Jaska',
      url: 'joojoo',
      likes: 1,
    };

    const responseBeforeUpdating = await api.get('/api/blogs');
    const updateId = responseBeforeUpdating.body[0].id;

    await api
      .post(`/api/blogs/${updateId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(200);

    const responseAfterUpdating = await api.get('/api/blogs');

    assert.strictEqual(blog.title, responseAfterUpdating.body[0].title);
    assert.strictEqual(blog.author, responseAfterUpdating.body[0].author);
    assert.strictEqual(blog.url, responseAfterUpdating.body[0].url);
    assert.strictEqual(blog.likes, responseAfterUpdating.body[0].likes);
  });

  test('While updating, if not giving a value for an item, the old value remains', async () => {
    const blog = {};

    const responseBeforeUpdating = await api.get('/api/blogs');
    const updateId = responseBeforeUpdating.body[0].id;

    await api
      .post(`/api/blogs/${updateId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(200);

    const responseAfterUpdating = await api.get('/api/blogs');

    assert.strictEqual(
      responseBeforeUpdating.body[0].title,
      responseAfterUpdating.body[0].title
    );
    assert.strictEqual(
      responseBeforeUpdating.body[0].author,
      responseAfterUpdating.body[0].author
    );
    assert.strictEqual(
      responseBeforeUpdating.body[0].url,
      responseAfterUpdating.body[0].url
    );
    assert.strictEqual(
      responseBeforeUpdating.body[0].likes,
      responseAfterUpdating.body[0].likes
    );
  });

  test('While updating, if only giving values for some of the items, they update and the rest keep their old values', async () => {
    const blog = {
      title: 'Maken seikkailut osa 9',
      likes: 33,
    };

    const responseBeforeUpdating = await api.get('/api/blogs');
    const updateId = responseBeforeUpdating.body[0].id;

    await api
      .post(`/api/blogs/${updateId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(200);

    const responseAfterUpdating = await api.get('/api/blogs');

    assert.strictEqual(blog.title, responseAfterUpdating.body[0].title);
    assert.strictEqual(
      responseBeforeUpdating.body[0].author,
      responseAfterUpdating.body[0].author
    );
    assert.strictEqual(
      responseBeforeUpdating.body[0].url,
      responseAfterUpdating.body[0].url
    );
    assert.strictEqual(blog.likes, responseAfterUpdating.body[0].likes);
  });
});
after(async () => {
  await mongoose.connection.close();
});

test('Adding a new blog does not work if no token is sent in the call', async () => {
  const blog = {
    title: 'test Blog',
    url: 'blogblog.com',
  };

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(401)
    .expect('Content-Type', /application\/json/);
});
