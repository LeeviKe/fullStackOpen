const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
};

export const setUser = (userData) => {
  return {
    type: 'SET_USER',
    data: userData,
  };
};

export const clearUser = () => {
  return {
    type: 'CLEAR_USER',
  };
};

export default userReducer;
