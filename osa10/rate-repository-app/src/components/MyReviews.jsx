import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
} from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme';
import useMe from '../hooks/useMe';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  ownerAvatar: {
    width: 55,
    height: 55,
    borderRadius: 4,
  },
  languageElement: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    padding: '2%',
    borderRadius: 4,
    color: 'white',
  },
  upperProfile: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: screenHeight * 0.02,
    marginLeft: screenHeight * 0.02,
  },
  upperProfileInfo: {
    marginLeft: screenHeight * 0.02,
    flex: 1,
  },
  upperProfileInfoText: {
    marginBottom: screenHeight * 0.005,
  },

  reviewCard: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: screenHeight * 0.02,
    marginLeft: screenHeight * 0.02,
    marginBottom: '5%',
    backgroundColor: 'white',
    margin: 20,
  },

  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  ratingText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 17,
  },

  separator: {
    height: 10,
  },
});

const MyReviews = () => {
  const { me, loading } = useMe(true);

  if (loading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={me.reviews.edges}
      keyExtractor={(item) => item.node.id}
      renderItem={({ item }) => {
        const review = item.node;
        return (
          <View style={styles.container}>
            <View style={styles.reviewCard}>
              <View style={styles.ratingCircle}>
                <Text style={styles.ratingText}>{review.rating}</Text>
              </View>
              <View style={styles.upperProfileInfo}>
                <Text
                  style={styles.upperProfileInfoText}
                  fontWeight="bold"
                  fontSize="subheading"
                >
                  {review.repository.fullName}
                </Text>
                <Text style={styles.upperProfileInfoText} color="textSecondary">
                  {format(new Date(review.createdAt), 'dd.MM.yyyy')}
                </Text>
                <Text>{review.text}</Text>
              </View>
            </View>
          </View>
        );
      }}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default MyReviews;
