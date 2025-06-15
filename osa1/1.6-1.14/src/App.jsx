import { useState } from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  if (good || neutral || bad) {
    return (
      <table>
        <tbody>
          <StatisticLine name="Good" value={good} />
          <StatisticLine name="Neutral" value={neutral} />
          <StatisticLine name="Bad" value={bad} />
          <StatisticLine name="All" value={all} />
          <StatisticLine name="Average" value={average.toFixed(1)} />
          <StatisticLine name="Positive" value={`${positive.toFixed(1)} %`} />
        </tbody>
      </table>
    );
  } else return <p>No feedback given</p>;
};

const StatisticLine = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
);

const Button = ({ click, name }) => {
  return <button onClick={click}>{name}</button>;
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.',
  ];
  const [votes, setVotes] = useState(Array(8).fill(0));

  const mostVotes = Math.max(...votes);
  const mostVotesIndex = votes.indexOf(mostVotes);

  const [selected, setSelected] = useState(0);

  function giveVote() {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  }

  function randomAnecdote() {
    const randomNumber = Math.floor(Math.random() * 7);
    if (randomNumber !== selected) {
      setSelected(randomNumber);
    } else setSelected(selected + 1);
  }

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => {
    setGood(good + 1);
  };
  const addNeutral = () => {
    setNeutral(neutral + 1);
  };
  const addBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <p>Has {votes[selected]} votes.</p>
      <Button click={giveVote} name="Vote"></Button>
      <Button click={randomAnecdote} name="Next anecdote"></Button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotesIndex]}</p>
      <p>Has {votes[mostVotesIndex]} votes.</p>
      <div>
        <h1>Give feedback</h1>
        <Button click={addGood} name="Good" />
        <Button click={addNeutral} name="Neutral" />
        <Button click={addBad} name="Bad" />
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

export default App;
