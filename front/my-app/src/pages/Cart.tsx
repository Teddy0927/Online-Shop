import React, { useEffect } from 'react';
import { LoadingState } from '../Components/model';
// import { loadCart } from '../cart/actions';
import { loadOneItem } from '../items/action';
import Skeleton from 'react-loading-skeleton';
import { useAppDispatch, useAppSelector } from '../store';
import Header from '../Components/Header';
import Menu from '../Components/Menu';

export default function Cart() {
    const dispatch = useAppDispatch();
    const cartLoaded = useAppSelector(state => state.cart.loading);
    console.log('cartloaded 1: ', cartLoaded);
    const carts = useAppSelector(state => state.cart.item_ids);
    const items = useAppSelector(state => state.items.items);

    useEffect(() => {
        for (const cart of carts) {
            dispatch(loadOneItem(cart))
            console.log('Cart page confirm: ', cart);
        }
    }, [carts, dispatch])
    console.log('cartloaded 2: ', cartLoaded);

    return (
        <div>
            <Header />
            <Menu />
            {/* {
                cartLoaded !== LoadingState.Loaded
                    ? <Skeleton count={10} />
                    : carts.map(cart => items.find(i => i._id.toString() === cart)).map((item, index) => (
                        <div key={item?._id}>{
                            !item
                                ? <Skeleton />
                                : <>
                                    {item.name} {item.price} {item.style} {item.alt}
                                </>
                        }</div>
                    ))
            } */}
            {
                                    carts.map(cart => items.find(i => i._id.toString() === cart)).map((item, index) => (
                                        <div key={item?._id}>{
                                            !item
                                                ? <Skeleton />
                                                : <>
                                                    {item.name} {item.price} {item.style} {item.alt}
                                                </>
                                        }</div>
                                    ))
            }
        </div>
    )
}