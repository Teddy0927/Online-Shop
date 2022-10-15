import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Menu from './Menu';

export default function UserSetting() {
    const [accountDetails, SetAccountDetails] = useState();

    async function getAccountDetails() {
        const res = await axios.get('/account');
        console.log(res.data);
        SetAccountDetails(res.data);
    }

    useEffect(() => {
        getAccountDetails();
    })

    return (
        <div>
            <h1>User Setting</h1>
            <h3>Edit Account Detail</h3>
            <form onSubmit={async e => {
                e.preventDefault();

                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/updateAccount`)
            }}>
                <input className="settingInput"></input>
            </form>
            <h3>Edit Password</h3>

            <h3>Remove Account</h3>
        </div>
    )
}