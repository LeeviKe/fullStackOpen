/* eslint-disable react/prop-types */
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import Select from 'react-select';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`;

const Authors = (props) => {
  const [born, setBorn] = useState('');
  const authors = useQuery(ALL_AUTHORS, { pollInterval: 2000 });
  const [editAuthor] = useMutation(EDIT_AUTHOR);
  const [selectedName, setSelectedName] = useState(null);
  const options =
    authors.data?.allAuthors?.map((i) => ({
      value: i.name,
      label: i.name,
    })) || [];

  if (!props.show) {
    return null;
  }

  if (authors.loading) {
    return <div>loading...</div>;
  }

  function updateBirthYear() {
    if (!selectedName) {
      return;
    }
    editAuthor({
      variables: { name: selectedName.value, setBornTo: Number(born) },
    }).then(() => {
      setBorn('');
      setSelectedName(null);
    });
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
        name
        <Select
          value={selectedName}
          onChange={(option) => setSelectedName(option)}
          options={options}
        />
      </div>
      <div>
        Year:
        <input value={born} onChange={({ target }) => setBorn(target.value)} />
      </div>
      <button onClick={updateBirthYear}>Update author</button>
    </div>
  );
};

export default Authors;
