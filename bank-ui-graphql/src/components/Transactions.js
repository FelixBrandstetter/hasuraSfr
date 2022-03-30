import { GET_TRANSACTIONS_SUBSCRIPTION } from "../graphql/Subscriptions";
import { useSubscription, useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { userIdReactive } from './LoginUser';

function Transactions() {
    const [transactions, setTransactions] = useState([])

    const { data, loading } = useSubscription(
        GET_TRANSACTIONS_SUBSCRIPTION,
        {
            variables: {
                userId: useReactiveVar(userIdReactive)
            },
            onSubscriptionData: (data) => {
                console.log(data);
                setTransactions([data]);
                console.log('Transactions received');
            }
        }
    );

    console.log(transactions);

    if (transactions.length == 0) {
        return "No transactions found";
    }

    const listOfTransactions = transactions[0].subscriptionData.data.transactions.map(({id, amount, description, recipient_id, sender_id}) =>
        <li key={id}>
            <p>Description: {description}, Amount: {amount}, SenderId: {sender_id}, ReceiverId: {recipient_id}</p>
        </li>
    );

    return (
        <ul>{listOfTransactions}</ul>
    )
}

export default Transactions;