import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { checkResponse } from '../auth/action';
import { useAppDispatch } from '../store';
import Header from './Header';
import Menu from './Menu';

export default function UserSetting() {
    const dispatch = useAppDispatch();
    const [accountDetails, SetAccountDetails] = useState([]);
    const [errorUpdate, SetErrorUpdate] = useState('');
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();



    async function getAccountDetails() {
        const res = await axios.get('/account');
        dispatch(checkResponse(res));
        console.log('account data: ', res.data)
        SetAccountDetails(res.data);
    }

    useEffect(() => {
        getAccountDetails();
    }, [])

    return (
        <div>
            <h1>User Setting</h1>
            <h3>Edit Account Detail</h3>
            {/* <form onSubmit={async e => {
                e.preventDefault();

                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/updateAccount`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(username, contactNumber, profilePicture, addressLineOne, addressLineTwo, addressLineThree)
                })
            }}> */}
            <form onSubmit={handleSubmit(async data => {
                const formData = new FormData();
                formData.append('username', data.username);
                formData.append('contact_number', data.contact_number);
                formData.append('profile_picture', data.profile_picture[0]);
                formData.append('address_1', data.address_1);
                formData.append('address_2', data.address_2);
                formData.append('address_postal_code', data.postal_code);
                formData.append('address_city', data.city);
                formData.append('address_state', data.state);
                formData.append('address_country', data.country);
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/updateAccount`, {
                    method: 'PATCH',
                    credentials: 'include',
                    body: formData
                });
                // dispatch(checkResponse(res))
                if (res.status === 200) {
                    alert('Update Success!');
                    navigate('/user')
                } else if (res.status === 400) {
                    SetErrorUpdate('Please try again')
                } else if (res.status === 404) {
                    SetErrorUpdate('Not found')
                }
            })}>
                <h1>{ errorUpdate }</h1>
                <label className="inputLabel">Username</label><br/>
                <input className="settingInput" placeholder="Username" {...register('username', {required: false})} /><br/>
                <label className="inputLabel">Contact Number</label><br/>
                <input className="settingInput" placeholder="Contact Number" {...register('contact_number', {required: false})} /><br/>
                <label className="inputLabel">Profile Picture</label><br/>
                <input className="settingInput" accept=".png, .jpg, .jpeg" type="file" {...register('profile_picture', {required: false})} /><br/>
                <label className="inputLabel">Address 1</label><br/>
                <input className="settingInput" placeholder="Address 1" {...register('address_1', {required: false})} /><br/>
                <label className="inputLabel">Address 2</label><br/>
                <input className="settingInput" placeholder="Address 2" {...register('address_2', {required: false})} /><br/>
                <label className="inputLabel">Postal Code</label><br/>
                <input className="settingInput" placeholder="Postal Code" {...register('address_postal_code', {required: false})} /><br/>
                <label className="inputLabel">City</label><br/>
                <input className="settingInput" placeholder="City" {...register('address_city', {required: false})} /><br/>
                <label className="inputLabel">State</label><br/>
                <input className="settingInput" placeholder="State" {...register('address_state', {required: false})} /><br/>
                <label className="inputLabel">Country</label><br/>
                <input className="settingInput" placeholder="Country" {...register('address_country', {required: false})} /><br/>
                <input className="settingButton" value="Update settings" type="submit"></input>
            </form>
            <h3>Edit Password</h3>

            <h3>Remove Account</h3>
        </div>
    )
}