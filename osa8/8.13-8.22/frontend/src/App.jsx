import { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommend from './components/Recommend';

const App = () => {
  const [page, setPage] = useState('authors');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {isLoggedIn && <button onClick={() => setPage('add')}>add book</button>}
        {isLoggedIn && (
          <button onClick={() => setPage('recommend')}>Recommend</button>
        )}
        {!isLoggedIn && <button onClick={() => setPage('login')}>Login</button>}
        {isLoggedIn && (
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setPage('authors');
              localStorage.removeItem('user-token');
            }}
          >
            Logout
          </button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'recommend'} />

      <Login
        show={page === 'login'}
        setIsLoggedIn={setIsLoggedIn}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
