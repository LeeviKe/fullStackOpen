const initialState = null;

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, time * 1000);
  };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
