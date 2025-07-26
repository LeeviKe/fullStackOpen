import { createContext, useReducer, useContext } from 'react';

const NotificationContext = createContext();
import PropTypes from 'prop-types';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'HIDE_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '');

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
