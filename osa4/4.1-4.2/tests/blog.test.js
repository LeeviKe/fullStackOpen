const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const listWithNoneBlogs = [];
const listWithOneBlog = [
  {
    _id: '685f1d31d1d3aa2e43a8faef',
    title: 'Matin seikkailut',
    author: 'Leevi',
    url: 'www.illegalYoutube.com',
    likes: 92,
    __v: 0,
  },
];
const listWithMultipleBlogs = [
  {
    _id: '685f1d31d1d3aa2e43a8faef',
    title: 'Matin seikkailut',
    author: 'Leevi',
    url: 'www.illegalYoutube.com',
    likes: 92,
    __v: 0,
  },
  {
    _id: '685f46a9e73bde505b899ab3',
    title: 'Jaskan kokkituokio',
    author: 'Jaska',
    url: 'www.food.fi',
    likes: 100,
    __v: 0,
  },
  {
    _id: '685f999cae1a2d3499af1122',
    title: 'Nordic Nights',
    author: 'Jaska',
    url: 'www.arctictravel.fi',
    likes: 58,
    __v: 0,
  },
  {
    _id: '685f999cb4fa6edbac11ddee',
    title: 'Leevi’s Deep Thoughts',
    author: 'Leevi',
    url: 'www.brainwaves.com',
    likes: 73,
    __v: 0,
  },
  {
    _id: '685faaa111edc00812baa912',
    title: 'Functional Programming Rocks',
    author: 'Ada',
    url: 'www.codequeen.org',
    likes: 204,
    __v: 0,
  },
  {
    _id: '685faaa211fdc00812b22122',
    title: 'Grilling with Jaska',
    author: 'Jaska',
    url: 'www.meatmasters.fi',
    likes: 94,
    __v: 0,
  },
  {
    _id: '685faabc12ffb003112aa342',
    title: 'Mountains and Mindfulness',
    author: 'Ella',
    url: 'www.zensteps.fi',
    likes: 61,
    __v: 0,
  },
  {
    _id: '685fabcd43fed1122adc9988',
    title: 'Back to Basics',
    author: 'Linus',
    url: 'www.kernelchronicles.fi',
    likes: 129,
    __v: 0,
  },
];

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('Total likes', () => {
  test('of empty list is 0', () => {
    const result = listHelper.totalLikes(listWithNoneBlogs);
    assert.strictEqual(result, 0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, listWithOneBlog[0].likes);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    assert.strictEqual(
      result,
      listWithMultipleBlogs.reduce((sum, blog) => sum + blog.likes, 0)
    );
  });
});

describe('Most liked blog', () => {
  test('of an empty list is empty', () => {
    const result = listHelper.favouriteBlog(listWithNoneBlogs);
    assert.deepStrictEqual(result, {});
  });

  test('when list only has one, is that blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  test('when list has multiple blogs, is the one with the most likes', () => {
    const result = listHelper.favouriteBlog(listWithMultipleBlogs);
    assert.deepStrictEqual(result, listWithMultipleBlogs[4]);
  });
});

describe('Author with the most blogs', () => {
  test('of an empty list is no one', () => {
    const result = listHelper.mostBlogs(listWithNoneBlogs);
    assert.deepStrictEqual(result, {});
  });

  test('when list only has one blog, is that author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.strictEqual(result.author, listWithOneBlog[0].author);
  });

  test('when list has multiple blogs, is the author with the most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    assert.deepStrictEqual(result.author, 'Jaska');
  });
});

describe('Author with the most likes', () => {
  test('of an empty list is no one', () => {
    const result = listHelper.mostLikes(listWithNoneBlogs);
    assert.deepStrictEqual(result, {});
  });

  test('when list only has one blog, is that author', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    assert.strictEqual(result.author, listWithOneBlog[0].author);
  });

  test('when list has multiple blogs, is the author with the most likes combined', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    assert.deepStrictEqual(result.author, 'Jaska');
  });
});
