import { AppDispatch } from "../store";
import axios from 'axios';
import { checkResponse, login } from "../auth/action";

export function loadedCart(item_ids: string[]) {
    return {
        type: '@@cart/LOADED_CART' as const,
        item_ids
    }
}

export function addToCart(item_id: string) {
    return {
        type: '@@cart/ADD_TO_CART' as const,
        item_id
    }
}

export function removeFromCart(item_id: string) {
    return {
        type: '@@cart/REMOVE_FROM_CART' as const,
        item_id
    }
}

type LoadedCartAction = ReturnType<typeof loadedCart>;
type AddToCartAction = ReturnType<typeof addToCart>;
type RemoveToCartAction = ReturnType<typeof removeFromCart>;

export type CartActions = LoadedCartAction | LoadedCartAction | AddToCartAction | RemoveToCartAction;

export function loadCart() {
    return async (dispatch: AppDispatch) => {
        const res = await axios.get('/cart')
        dispatch(checkResponse(res))
        dispatch(loadedCart(res.data.map((row:any) => row.item_id)))
    }
}

export function fetchAddToCart(item_id: string) {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await axios.post('/cart', {
                item_id: item_id
            })
            dispatch(checkResponse(res))

        } catch (err) {
            // dispatch(removeFromCart(item_id))
            dispatch(loadCart())
        }
    }
}