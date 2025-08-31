import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      totalCount
      edges {
        node {
          id
          ownerName
          name
          createdAt
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          url
          ownerAvatarUrl
          description
          language
          reviews {
            totalCount
            edges {
              node {
                id
                userId
                repositoryId
                rating
                createdAt
                text
                user {
                  id
                  username
                  createdAt
                  reviewCount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ME = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      createdAt
      reviews @include(if: $includeReviews) {
        totalCount
        edges {
          node {
            id
            userId
            repositoryId
            rating
            createdAt
            text
            user {
              id
              username
              createdAt
              reviewCount
            }
            repository {
              fullName
              createdAt
              name
              ownerName
              id
            }
          }
        }
      }
    }
  }
`;
