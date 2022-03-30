import { gql } from "@apollo/client";

export const CHECK_IF_USER_EXISTS_QUERY = gql`
    query CheckIfUserExists($username: String) {
        users(where: {username: {_eq: $username}}){id}
    }
`;