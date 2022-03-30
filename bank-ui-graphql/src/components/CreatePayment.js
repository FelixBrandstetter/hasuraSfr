import React, { useState } from "react";
import { CREATE_PAYMENT_MUTATION } from "../graphql/Mutations";
import { useMutation, useReactiveVar } from "@apollo/client";
import { userIdReactive } from './LoginUser';

function Form() {
    const [recipientId, setRecipientId] = useState(0);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0)
    const test = useReactiveVar(userIdReactive);
    const [createPayment, { loading, error }] = useMutation(CREATE_PAYMENT_MUTATION);

    const createPaymentOnClick = () => {
        createPayment({
            variables: {
                senderId: test,
                recipientId: recipientId,
                description: description,
                amount: amount
            },
            onCompleted: (data) => {
                console.log(data);
            }
        });

        if (loading) return <p>Loading...</p>;
        if (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Recipient ID"
                onChange={(e) => {
                    setRecipientId(parseInt(e.target.value));
                }}
            />
            <input
                type="text"
                placeholder="Description"
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            <input
                type="text"
                placeholder="Amount"
                onChange={(e) => {
                    setAmount(parseInt(e.target.value));
                }}
            />
            <button onClick={createPaymentOnClick}> Create Payment</button>
        </div>
    );
}

export default Form;