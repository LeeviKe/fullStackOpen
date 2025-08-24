import { useContext } from 'react';
import ApolloClientContext from '../contexts/ApolloClientContext';

const useAuthStorage = () => {
  return useContext(ApolloClientContext);
};

export default useAuthStorage;
