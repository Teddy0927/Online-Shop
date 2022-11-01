import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { Item } from './model';

export default function AdminEditItemList(props: {
    item: Item
}) {
    const item = props.item;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (
        <div className="col-md-3 col-6 d-flex justify-content-center">
            <div>
                <img className="item" src={ `${process.env.REACT_APP_BACKEND_URL}/uploads/${item.item_photo}` } alt={ item.item_alt } />
                <p> { item.item_name } <br /> { item.item_style } <br /> HK$ { item.item_price } <br /></p>
                <button onClick={() => navigate(`/editItem/${item._id}`)}>Edit item</button>
            </div>
        </div>
    )
}