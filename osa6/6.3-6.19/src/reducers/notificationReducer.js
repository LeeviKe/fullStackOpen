import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Test notification',
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload;
    },
    clearNotification() {
      return '';
    },
  },
});

export const { setNotificationMessage, clearNotification } =
  notificationSlice.actions;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(setNotificationMessage(`${content}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
