import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdote } from './requests';
import { useNotification } from './NotificationContext';

const App = () => {
  const [, dispatch] = useNotification();

  const notification = (message) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message });
    setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 5000);
  };

  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updateAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      notification(`Anecdote ${updateAnecdote.content} voted`);
    },
  });

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>Anecdote service not available due to problems in server</div>;
  }
  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
