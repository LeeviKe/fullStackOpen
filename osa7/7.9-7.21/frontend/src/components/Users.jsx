import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import getAll from '../services/users';

const userStyle = {
  background: 'white',
  border: '1px solid #ddd',
  padding: '15px',
  marginBottom: '15px',
  borderRadius: '6px',
};

const linkStyle = {
  color: 'black',
  textDecoration: 'none',
  marginRight: '15px',
  fontWeight: 'bold',
};

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll().then((data) => setUsers(data));
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <div>
        {users.map((u) => (
          <div key={u.id} style={userStyle}>
            <Link style={linkStyle} to={`/users/${u.id}`}>
              {u.username}
            </Link>
            <span>{u.blogs.length}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
