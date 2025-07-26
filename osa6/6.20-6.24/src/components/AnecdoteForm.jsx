import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotification } from '../NotificationContext';

const AnecdoteForm = () => {
  const [, dispatch] = useNotification();

  const notification = (message) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message });
    setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 5000);
  };

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
    onError: (error) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'Too short anecdote, must have length 5 or more',
      });
      setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 5000);
    },
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    newAnecdoteMutation.mutate({ content, votes: 0 });
    notification(`Anecdote ${content} created`);

    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
