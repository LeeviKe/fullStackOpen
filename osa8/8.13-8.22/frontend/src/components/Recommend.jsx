/* eslint-disable react/prop-types */
import { gql, useQuery } from '@apollo/client';

const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const Recommend = (props) => {
  const data = useQuery(ME);

  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  });

  if (!props.show) {
    return null;
  }

  if (data.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre{' '}
        <strong>{data.data.me.favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks
            .filter((book) =>
              data.data.me.favoriteGenre
                ? book.genres
                    .map((g) => g.toLowerCase())
                    .includes(data.data.me.favoriteGenre)
                : true
            )
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
