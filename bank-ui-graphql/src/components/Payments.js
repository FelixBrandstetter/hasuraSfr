import { GET_PAYMENTS_SUBSCRIPTION } from "../graphql/Subscriptions";
import { useSubscription, useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { userIdReactive } from './LoginUser';

function Payments() {
    const [payments, setPayments] = useState([])

    const { data, loading } = useSubscription(
        GET_PAYMENTS_SUBSCRIPTION,
        {
            variables: {
                userId: useReactiveVar(userIdReactive),
            },
            onSubscriptionData: (data) => {
                console.log(data);
                setPayments([data]);
                console.log('Payments received');
            }
        }
    );

    console.log(payments);

    if (payments.length == 0) {
        return "No payments found";
    }

    const listOfPayments = payments[0].subscriptionData.data.payments.map(({id, amount, description, sender_id, recipient_id, status}) =>
        <li key={id}>
            <p>Description: {description}, Amount: {amount}, SenderId: {sender_id}, ReceiverId: {recipient_id}, Status: {status}</p>
        </li>
    );

    return (
        <ul>{listOfPayments}</ul>
    )
}

export default Payments;