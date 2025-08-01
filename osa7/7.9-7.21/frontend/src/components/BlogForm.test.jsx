import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, vi, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import BlogForm from './blogForm';

test('Calls createBlog with correct details after sending data', async () => {
  const createBlogMock = vi.fn();
  render(<BlogForm createBlog={createBlogMock} />);

  const user = userEvent.setup();

  const titleInput = screen.getByPlaceholderText('title');
  const authorInput = screen.getByPlaceholderText('author');
  const urlInput = screen.getByPlaceholderText('url');
  const createButton = screen.getByText('Create');

  await user.type(titleInput, 'test blog');
  await user.type(authorInput, 'TestAuthor');
  await user.type(urlInput, 'blogTest.com');
  await user.click(createButton);

  expect(createBlogMock.mock.calls).toHaveLength(1);
  expect(createBlogMock.mock.calls[0][0]).toEqual({
    title: 'test blog',
    author: 'TestAuthor',
    url: 'blogTest.com',
  });
});
