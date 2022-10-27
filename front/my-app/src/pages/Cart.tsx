import React, { useEffect } from 'react';
import { LoadingState } from '../Components/model';
import { clearCart, fetchDecreaseQuantity, fetchIncreaseQuantity, loadCart } from '../cart/action';
import { loadOneItem } from '../items/action';
import Skeleton from 'react-loading-skeleton';
import { useAppDispatch, useAppSelector } from '../store';
import { NavLink } from 'react-router-dom';


export default function Cart() {
    const dispatch = useAppDispatch();
    const cartLoaded = useAppSelector(state => state.cart.loading);
    const carts = useAppSelector(state => state.cart.item_ids);
    console.log('cart output: ',carts);
    const items = useAppSelector(state => state.items.items);

    useEffect(() => {
        for (const cart of carts) {
            console.log('cart is what: ', cart)
            dispatch(loadOneItem(cart))
        }
    }, [carts, dispatch])

    return (
        <div className="container cart">
            <div className="cartRemoveButton" onClick={() => {clearCart()}}>Clear Shopping Cart</div>
            {
                cartLoaded !== LoadingState.Loaded
                ? <Skeleton count={10} />
                :   carts.map(cart => items.find(i => i._id.toString() === cart[0])).map((item, index) => (
                    <div key={index}>{
                        !item
                            ? <Skeleton/>
                            : <>
                                <div className="row item">
                                    <div className="col-4 col-md-4">
                                        <NavLink to={`/item/${item._id}`}>
                                            <img className="cartItemImage"src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${item.photo}`} alt={item.alt}/>
                                        </NavLink>
                                    </div>
                                    <div className="col-6 col-md-6 cartText">
                                        <h5>{item.name}</h5>
                                        <p>{item.alt}</p>
                                        <p>Style: {item.style}</p>
                                        <div className="quantityControl">
                                            <div className="btnMinus" onClick={() => {fetchDecreaseQuantity(item._id)}}>-</div>
                                            <input className="quantityInput" type="text" value={item.quantity}/>
                                            <div className="btnPlus" onClick={() => {fetchIncreaseQuantity(item._id)}}>+</div>
                                        </div>
                                    </div>
                                    <div className="col-2 col-md-2">
                                        <div className="cartRemoveButton">Remove</div>
                                        <div className="cartPrice">HK${item.price}</div>
                                    </div>
                                </div>
                                {/* {item.name} {item.price} {item.style} {item.alt} */}
                            </>
                    }</div>
                ))
            }
        </div>
    )
}