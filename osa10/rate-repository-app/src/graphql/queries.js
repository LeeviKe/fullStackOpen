import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      totalCount
      edges {
        node {
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          ownerAvatarUrl
          description
          language
          forksCount
        }
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
