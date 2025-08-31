// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-native';
// eslint-disable-next-line no-unused-vars
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
// eslint-disable-next-line no-unused-vars
import Text from './Text';
import Constants from 'expo-constants';

import { useQuery } from '@apollo/client';
import useMe from '../hooks/useMe';
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
    marginHorizontal: 20,
    color: '#fff',
    fontWeight: 'bold',
    flexShrink: 0,
  },
});

const AppBar = () => {
  const { me, loading } = useMe();
  const navigate = useNavigate();

  if (loading) {
    return null;
  }

  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signPress = () => {
    if (me) {
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
        {!me && (
          <Link to="/signup">
            <Text style={styles.linkText}>Sign up</Text>
          </Link>
        )}
        {me && (
          <Link to="/reviewform">
            <Text style={styles.linkText}>Create a review</Text>
          </Link>
        )}
        {me && (
          <Link to="/myreviews">
            <Text style={styles.linkText}>My reviews</Text>
          </Link>
        )}

        <Pressable onPress={signPress}>
          <Text style={styles.linkText}>{me ? 'Sign out' : 'Sign in'}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;
