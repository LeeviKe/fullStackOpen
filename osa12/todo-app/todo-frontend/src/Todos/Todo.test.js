// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders todo text', () => {
  const todo = { text: 'testii', done: false };
  render(
    <Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />
  );
  expect(screen.getByText('testii')).toBeInTheDocument();
});
