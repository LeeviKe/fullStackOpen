import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import getAll from '../services/users';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAll().then((users) => {
      const match = users.find((u) => u.id === id);
      setUser(match);
    });
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>{user.username}</h2>
      <h4>Added blogs:</h4>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
