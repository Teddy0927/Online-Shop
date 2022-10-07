import React from 'react';
import Header from '../Components/Header';
import Menu from '../Components/Menu';

export default function Collection() {
    // const res = fetch(`${process.env.REACT_APP_BACKEND_URL}/item`)
    return (
        <div>
            <Header />
            <Menu />
            {/* {
                res.map((flower, index) => (
                    <SellingItems item={flower} key={index} />
                ))
            } */}
        </div>
    )
}