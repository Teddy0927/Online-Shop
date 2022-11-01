import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { checkResponse } from '../auth/action';
import { loadOrder, loadOrderLatest, payOrder } from '../order/action';
import { useAppDispatch, useAppSelector } from '../store';
import { LoadingState } from '../Components/model';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';

export default function Payment() {
    const dispatch = useAppDispatch();
    const orderLoaded = useAppSelector(state => state.order.loading)
    const orders = useAppSelector(state => state.order.orders)
    let total: number;
    let subtotal;
    const [displayMoney, setDisplayMoney] = useState('')
    // const [payment, setPayment] = useState([])
    // async function getPaymentOrder() {
    //     const res = await axios.get('/orderLatest')
    //     setPayment(res.data[0])
    //     console.log(res.data[0]);
    // }

    // async function paid() {
    //     const res = await axios.post(`/paid/${payment}`)
    // }

    // useEffect(() => {
    //     getPaymentOrder()
    // }, [])


    useEffect(() => {
        dispatch(loadOrderLatest())
    }, [dispatch])

    return (
        <div className="container-fluid">
            <h1>Payment</h1>
            <img className="paymeQRCode" alt="PayMe QR Code" src={require('../IMG_2207.JPG')} />
            <div className="row paymentGuide">
                <h3>Paying with PayMe</h3>
                <div className="col-12 col-md-4">1. Open the PayMe app.</div>
                <div className="col-12 col-md-4">2. Scan the PayCode to authorize payment.</div>
                <div className="col-12 col-md-4">3. Complete payment in the app and click the Paid! button.</div>
            </div>


            {
                orderLoaded !== LoadingState.Loaded
                    ? <Skeleton count={10} />
                    : orders.map((order, index) => (
                        <div key={index}>{
                            !orders
                                ? <Skeleton />
                                : <>
                                    <div className="row">
                                        <div className="col-12">
                                            <h3>Order number: {order._id}</h3>
                                            <h4>Status: {order.status} </h4>
                                            {order.carts.map((cart, index) => (
                                                // <div key={index}>
                                                //     <img className="cartItemImage" src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${cart.item_photo}`} alt={cart.item_alt}/>
                                                //     <p>Item: {cart.item_alt}</p>
                                                //     <p>Price: HK${cart.item_price}</p>
                                                //     <p>Quantity: {cart.quantity}</p>
                                                //     <p>Subtotal: HK${cart.item_price * cart.quantity}</p>
                                                // </div>
                                                <div className="row item" key={index}>
                                                    <div className="col-4 col-md-4">
                                                        <NavLink to={`/item/${cart._id}`}>
                                                            <img className="cartItemImage" src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${cart.item_photo}`} alt={cart.item_alt} />
                                                        </NavLink>
                                                    </div>
                                                    <div className="col-6 col-md-6 cartText">
                                                        <h5>{cart.item_name}</h5>
                                                        <p>{cart.item_alt}</p>
                                                        <p>Style: {cart.item_style}</p>
                                                    </div>
                                                    <div className="col-2 col-md-2">
                                                        <div className="cartPrice">HK${cart.item_price}</div>
                                                    </div>
                                                </div>
                                            ))}
                                            <h3>Total: HK${order.displayMoney}</h3>
                                        </div>
                                    </div>
                                    <button className="checkoutButton" onClick={() => dispatch(payOrder(order._id))}>Paid!</button>
                                </>
                        }
                        </div>
                    )
                    )
            }




        </div>
    )
}
