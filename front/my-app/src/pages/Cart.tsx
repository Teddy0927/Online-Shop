import React, { useEffect } from 'react';
import { LoadingState } from '../Components/model';
// import { loadCart } from '../cart/action';
import { loadOneItem } from '../items/action';
import Skeleton from 'react-loading-skeleton';
import { useAppDispatch, useAppSelector } from '../store';
import { NavLink } from 'react-router-dom';


export default function Cart() {
    const dispatch = useAppDispatch();
    const cartLoaded = useAppSelector(state => state.cart.loading);
    const carts = useAppSelector(state => state.cart.item_ids);
    const items = useAppSelector(state => state.items.items);

    useEffect(() => {
        for (const cart of carts) {
            dispatch(loadOneItem(cart))
        }
    }, [carts, dispatch])

    return (
        <div className="container cart">
            {
                cartLoaded !== LoadingState.Loaded
                ? <Skeleton count={10} />
                :   carts.map(cart => items.find(i => i._id.toString() === cart)).map((item, index) => (
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
                                            <div className="btnMinus" onClick={() => {}}>-</div>
                                            <input className="quantityInput" type="text" placeholder="1"/>
                                            <div className="btnPlus">+</div>
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