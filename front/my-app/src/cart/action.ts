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

export function clearedCart() {
    return {
        type: '@@cart/CLEARED_CART' as const,
    }
}

export function increasedQuantity() {
    return {
        type: '@@cart/INCREASED_QUANTITY' as const,
        
    }
}

type LoadedCartAction = ReturnType<typeof loadedCart>;
type AddToCartAction = ReturnType<typeof addToCart>;
type RemoveToCartAction = ReturnType<typeof removeFromCart>;
type ClearedCartAction = ReturnType<typeof clearedCart>;

export type CartActions = LoadedCartAction | LoadedCartAction | AddToCartAction | RemoveToCartAction | ClearedCartAction;

export function loadCart() {
    return async (dispatch: AppDispatch) => {
        const res = await axios.get('/cart')
        console.log('load cart front data: ',res)
        dispatch(checkResponse(res))
        dispatch(loadedCart(res.data.map((row:any) => row.item_id)))
    }
}

export function fetchAddToCart(item_id: string) {
    return async (dispatch: AppDispatch) => {
        dispatch(addToCart(item_id))
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

export function clearCart() {
    return async (dispatch: AppDispatch) => {
        const res = await axios.delete('/cart')
        dispatch(checkResponse(res))
        dispatch(clearedCart())
    }
}