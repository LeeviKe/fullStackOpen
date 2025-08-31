// eslint-disable-next-line no-unused-vars
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
// eslint-disable-next-line no-unused-vars
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  Picker: {
    backgroundColor: '#dadadaff',
  },
  Searchbar: {
    borderRadius: 0,
    backgroundColor: '#dadadaff',
  },
});

const RepositoryList = () => {
  const [sortingMethod, setSortingMethod] = useState('latestRepositories');
  const [repositoryOrderBy, setRepositoryOrderBy] = useState('CREATED_AT');
  const [repositoryOrderDirection, setRepositoryOrderDirection] =
    useState('ASC');
  const [searchText, setSearchText] = useState('');
  const [searchKeyword] = useDebounce(searchText, 500);

  useEffect(() => {
    if (sortingMethod === 'latestRepositories') {
      setRepositoryOrderBy('CREATED_AT');
      setRepositoryOrderDirection('DESC');
    }
    if (sortingMethod === 'highestRatedRepositories') {
      setRepositoryOrderBy('RATING_AVERAGE');
      setRepositoryOrderDirection('DESC');
    }
    if (sortingMethod === 'lowestRatedRepositories') {
      setRepositoryOrderBy('RATING_AVERAGE');
      setRepositoryOrderDirection('ASC');
    }
  }, [sortingMethod]);

  const { repositories } = useRepositories(
    repositoryOrderBy,
    repositoryOrderDirection,
    searchKeyword
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortingMethod={sortingMethod}
      setSortingMethod={setSortingMethod}
      searchText={searchText}
      setSearchText={setSearchText}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  sortingMethod,
  setSortingMethod,
  searchText,
  setSearchText,
}) => {
  const navigate = useNavigate();

  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem {...item} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View>
          <Searchbar
            style={styles.Searchbar}
            placeholder="Search"
            onChangeText={setSearchText}
            value={searchText}
          />
          <Picker
            selectedValue={sortingMethod}
            onValueChange={(option) => setSortingMethod(option)}
            style={styles.Picker}
          >
            <Picker.Item
              label="Latest repositories"
              value="latestRepositories"
            />
            <Picker.Item
              label="Highest rated repositories"
              value="highestRatedRepositories"
            />
            <Picker.Item
              label="Lowest rated repositories"
              value="lowestRatedRepositories"
            />
          </Picker>
        </View>
      }
    />
  );
};

export default RepositoryList;
