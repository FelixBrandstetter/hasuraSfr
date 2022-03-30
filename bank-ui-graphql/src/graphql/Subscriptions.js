import { gql } from "@apollo/client";

export const GET_TRANSACTIONS_SUBSCRIPTION = gql`
    subscription GetTransactionsForUser($userId: Int) {
      transactions(where: {_or: [{sender_id:{_eq:$userId}}, {recipient_id:{_eq:$userId}}]}) {
        amount
        created_at
        description
        recipient_id
        sender_id
      }
    }
`;

export const GET_PAYMENTS_SUBSCRIPTION = gql`
    subscription GetPaymentsForUser($userId: Int) {
      payments(where: {sender_id: {_eq: $userId}}) {
        amount
        created_at
        description
        recipient_id
        sender_id
        status
        id
      }
    }
`;