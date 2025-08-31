// eslint-disable-next-line no-unused-vars
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  FlatList,
} from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';

import { format } from 'date-fns';

// eslint-disable-next-line no-unused-vars
import Text from './Text';
import theme from '../theme';

import useRepositories from '../hooks/useRepositories';

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

  lowerProfile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: screenHeight * 0.04,
  },
  lowerProfileSlot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: screenHeight * 0.02,
  },
  lowerProfileSlotNumber: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    marginBottom: screenHeight * 0.01,
  },
  linkElement: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  linkButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 12,
    width: '86%',
    alignItems: 'center',
  },

  linkText: {
    padding: '2%',
    borderRadius: 4,
    color: 'white',
  },

  reviewCard: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: screenHeight * 0.02,
    marginLeft: screenHeight * 0.02,
    marginBottom: '5%',
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

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <View testID="repositoryItem" style={styles.infoContainer}>
      <View style={styles.upperProfile}>
        <Image
          style={styles.ownerAvatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.upperProfileInfo}>
          <Text
            style={styles.upperProfileInfoText}
            fontWeight="bold"
            fontSize="subheading"
          >
            {repository.fullName}
          </Text>
          <Text style={styles.upperProfileInfoText} color="textSecondary">
            {repository.description}
          </Text>
          <Text style={styles.languageElement}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.lowerProfile}>
        <View style={styles.lowerProfileSlot}>
          <Text style={styles.lowerProfileSlotNumber}>
            {repository.stargazersCount}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.lowerProfileSlot}>
          <Text style={styles.lowerProfileSlotNumber}>
            {repository.forksCount}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.lowerProfileSlot}>
          <Text style={styles.lowerProfileSlotNumber}>
            {repository.reviewCount}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.lowerProfileSlot}>
          <Text style={styles.lowerProfileSlotNumber}>
            {repository.ratingAverage}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
      <View style={styles.linkElement}>
        <Pressable
          style={styles.linkButton}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text style={styles.linkText}>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View testID="ReviewItem" style={styles.container}>
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
            {review.user.username}
          </Text>
          <Text style={styles.upperProfileInfoText} color="textSecondary">
            {format(new Date(review.createdAt), 'dd.mm.yyyy')}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repositories } = useRepositories();
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    for (const singleRepository of repositories) {
      if (singleRepository.id === id) {
        setRepository(singleRepository);
      }
    }
  }, [repositories, id]);

  if (!repository) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
