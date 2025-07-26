import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteLIst = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  console.log(anecdotes);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    console.log('vote', anecdote.id);
    dispatch(voteAnecdote(anecdote.id));

    dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
  };

  const filteredAnecdotes = anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteLIst;
