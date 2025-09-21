import { render, screen } from '@testing-library/react'
import { expect, vi, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'test',
  author: 'testman',
  url: 'test.com',
  likes: 42,
  user: [
    {
      id: '1234567',
      username: 'testUser'
    }
  ],
  id: 'blog123'
}

const mockHandler = vi.fn()

// When pressing like-button, it activates a backend call before calling the testable funcion in the updateBlog (3rd) test.
// This evades the backend call with a mock function.
vi.mock('../services/blogs', () => ({
  default: {
    update: vi.fn().mockResolvedValue({})
  }
}))

test('Renders title and author but not url and likes', () => {
  render(<Blog blog={blog} updateBlog={mockHandler} />)

  expect(screen.getByText('test testman')).toBeDefined()

  expect(screen.queryByText('test.com')).toBeNull()
  expect(screen.queryByText('Likes: 42')).toBeNull()
})

test('shows url, likes, and username after clicking "View"', async () => {
  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  expect(screen.getByText('test.com')).toBeDefined()
  expect(screen.getByText('Likes: 42')).toBeDefined()
  expect(screen.getByText('testUser')).toBeDefined()
})

test('Calls updateBlog twice when like button is clicked twice', async () => {
  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
