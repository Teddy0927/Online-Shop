import React from 'react';
import { fetchAddToCart } from '../cart/action';
import { useAppDispatch } from '../store';
import { Item } from './model';

export default function SellingItems(props: {
    item: Item
}) {
    const item = props.item;
    const dispatch = useAppDispatch();

    return (
        <div className="col-md-3 col-6 d-flex justify-content-center">
            <div>
                <img className="item" src={ `${process.env.REACT_APP_BACKEND_URL}/uploads/${item.photo}` } alt={ item.alt } />
                <p> { item.name } <br /> { item.style } <br /> { item.price } <br /></p>
                <button onClick={() => dispatch(fetchAddToCart(item._id))}>Add To Cart</button>
            </div>
        </div>
    )
}