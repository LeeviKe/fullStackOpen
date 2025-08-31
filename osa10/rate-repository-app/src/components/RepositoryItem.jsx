// eslint-disable-next-line no-unused-vars
import { View, StyleSheet, Image, Dimensions } from 'react-native';
// eslint-disable-next-line no-unused-vars
import Text from './Text';
import theme from '../theme';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: screenHeight * 0.26,
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
});

const RepositoryItem = ({
  fullName,
  description,
  language,
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
  ownerAvatarUrl,
}) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.upperProfile}>
        <Image style={styles.ownerAvatar} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.upperProfileInfo}>
          <Text
            style={styles.upperProfileInfoText}
            fontWeight="bold"
            fontSize="subheading"
          >
            {fullName}
          </Text>
          <Text style={styles.upperProfileInfoText} color="textSecondary">
            {description}
          </Text>
          <Text style={styles.languageElement}>{language}</Text>
        </View>
      </View>
      <View style={styles.lowerProfile}>
        <View style={styles.lowerProfileSlot}>
          <Text style={styles.lowerProfileSlotNumber}>{stargazersCount}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.lowerProfileSlot}>
          <Text style={styles.lowerProfileSlotNumber}>{forksCount}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.lowerProfileSlot}>
          <Text style={styles.lowerProfileSlotNumber}>{reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.lowerProfileSlot}>
          <Text style={styles.lowerProfileSlotNumber}>{ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
