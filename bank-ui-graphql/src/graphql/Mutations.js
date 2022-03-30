import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
    mutation createUser($username: String) {
        insert_users_one(object: {
            username: $username
            }) {
            id
        }
    }
`;

export const CREATE_PAYMENT_MUTATION = gql`
    mutation CreatePayment($senderId: Int, $recipientId: Int, $description: String, $amount: Int) {
        insert_payments_one(object: {
            sender_id: $senderId,
            recipient_id: $recipientId,
            description: $description,
            amount: $amount
        }) {
            id
        }
    }
`;