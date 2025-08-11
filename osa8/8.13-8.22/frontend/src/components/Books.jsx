/* eslint-disable react/prop-types */
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const books = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    pollInterval: 2000,
  });

  if (!props.show) {
    return null;
  }

  if (books.loading) {
    return <div>loading...</div>;
  }

  const genres = [];
  books.data.allBooks.forEach((a) => {
    for (let i = 0; i < a.genres.length; i++) {
      if (!genres.includes(a.genres[i].toLowerCase())) {
        genres.push(a.genres[i].toLowerCase());
      }
    }
  });

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button
          onClick={() => {
            if (selectedGenre === genre.toLowerCase()) {
              setSelectedGenre(null);
            } else {
              setSelectedGenre(genre);
            }
          }}
          style={{
            outline:
              selectedGenre === genre.toLowerCase()
                ? '2px solid #085fbcff'
                : 'none',
          }}
          key={genre}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
