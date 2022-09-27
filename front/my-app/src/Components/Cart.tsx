import React, { useEffect } from 'react';
import { loadCart } from '../cart/actions';
import { loadOneItem } from '../items/action';
import { useAppDispatch, useAppSelector } from '../store';
import Header from './Header';
import Menu from './Menu';
import { LoadingState } from './model';

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
        <div>
            <Header />
            <Menu />
        { cartLoaded !== LoadingState.Loaded ? <div></div> :
            carts.map(cart => items.find(i => i._id === cart)).map(item => (
                <div key={1}>{
                    !item ? <div>Damn</div> : 
                    <div key={item._id}>
                        {item.name} {item.price} 
                        </div>
                    }</div>
            )) }
        </div>

        // <div>Cart List
        //         {carts.map(cart => items.find(i => i._id === cart)).map(item =>  (
        //             <div>
        //                 {
        //                     {item.name} {item.style} {item.price}
        //                 }
        //             </div>

        //         ))}         
        // </div>
    )
}