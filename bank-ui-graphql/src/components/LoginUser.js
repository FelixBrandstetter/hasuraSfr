import React, { useState } from "react";
import { CREATE_USER_MUTATION } from "../graphql/Mutations";
import { CHECK_IF_USER_EXISTS_QUERY } from "../graphql/Queries";
import { useLazyQuery, useMutation, makeVar } from "@apollo/client";
import Payments from "./Payments";
import Transactions from "./Transactions";

export const userIdReactive = makeVar(0);

function Form() {
    const [username, setUsername] = useState("");

    const [checkIfUserExists] = useLazyQuery(CHECK_IF_USER_EXISTS_QUERY);
    const [createNewUser] = useMutation(CREATE_USER_MUTATION);

    const loginUserOnClick = () => {
        console.log(`CURRENT USER ID: ${userIdReactive()}`)

        checkIfUserExists({
            variables: {
                username: username
            },
            onCompleted: (data) => {
                console.log(data);
                if (data.users.length > 0) {
                    userIdReactive(data.users[0].id);
                    console.log(`Logged in with id: ${userIdReactive()}`);
                }
                else {
                    createNewUser({
                        variables: {
                            username: username
                        },
                        onCompleted: (data) => {
                            console.log(data.insert_users_one.id);
                            userIdReactive(data.insert_users_one.id);
                            console.log(`Created new user with id: ${userIdReactive()}`)
                        }
                    });
                }
            }
        });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <button onClick={loginUserOnClick}> Login</button>
        </div>
    );
}

export default Form;