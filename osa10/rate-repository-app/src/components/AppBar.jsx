// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-native';
// eslint-disable-next-line no-unused-vars
import { StyleSheet, View, ScrollView } from 'react-native';
// eslint-disable-next-line no-unused-vars
import Text from './Text';

import Constants from 'expo-constants';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.linkText}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.linkText}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
