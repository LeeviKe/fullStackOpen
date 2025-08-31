import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = (includeReviews = false) => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews },
  });

  return { me: data?.me, loading, error };
};

export default useMe;
