import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (
  repositoryOrderBy,
  repositoryOrderDirection,
  repositorySearchKeyword
) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: repositoryOrderBy,
      orderDirection: repositoryOrderDirection,
      searchKeyword: repositorySearchKeyword,
    },
  });

  const repositories = data?.repositories?.edges.map((edge) => edge.node) || [];

  return { repositories, loading, error };
};

export default useRepositories;
