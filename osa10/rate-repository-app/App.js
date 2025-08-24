/* eslint-disable no-unused-vars */
import Main from './src/components/Main.jsx';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient.js';

import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import ApolloClientContext from './src/contexts/ApolloClientContext.js';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <ApolloClientContext.Provider value={apolloClient}>
              <Main />
            </ApolloClientContext.Provider>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
