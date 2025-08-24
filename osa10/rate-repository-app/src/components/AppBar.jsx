// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-native';
// eslint-disable-next-line no-unused-vars
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
// eslint-disable-next-line no-unused-vars
import Text from './Text';
import Constants from 'expo-constants';

import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useNavigate } from 'react-router-native';

import useAuthStorage from '../hooks/useAuthStorage';
import useApolloClient from '../hooks/useApolloClient';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingLeft: 16,
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  linkText: {
    margin: 20,
    marginHorizontal: 60,
    color: '#fff',
    fontWeight: 'bold',
    width: 90,
  },
});

const AppBar = () => {
  const navigate = useNavigate();
  const { data } = useQuery(ME);

  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signPress = () => {
    if (data?.me) {
      console.log('Sign out clicked');
      authStorage.removeAccessToken();
      apolloClient.resetStore();
    } else {
      navigate('/signin');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.linkText}>Repositories</Text>
        </Link>
        <Pressable onPress={signPress}>
          <Text style={styles.linkText}>
            {data?.me ? 'Sign out' : 'Sign in'}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;
