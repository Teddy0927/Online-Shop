import { AppDispatch } from "../store";
import axios from 'axios';
import { checkResponse, login } from "../auth/action";

export function loadedCart(item_ids: string[]) {
// export function loadedCart(item_ids: {item_id: string, quantity: number}[]) {
    
    console.log('loaded cart data: ',item_ids)
    return {
        type: '@@cart/LOADED_CART' as const,
        item_ids
    }
}

export function loadedCartQuantity(quantity: string) {
    return {
        type: '@@cart/LOADED_CART_QUANTITY' as const,
        quantity
    }
}

export function addToCart(item_id: string) {
    return {
        type: '@@cart/ADD_TO_CART' as const,
        item_id,
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

export function increasedQuantity(item_id: string) {
    return {
        type: '@@cart/INCREASED_QUANTITY' as const,
        item_id,
    }
}

export function decreasedQuantity(item_id: string) {
    return {
        type: '@@cart/DECREASED_QUANTITY' as const,
        item_id,
    }
}

type LoadedCartAction = ReturnType<typeof loadedCart>;
// type LoadedCartQuantityAction = ReturnType<typeof loadCartQuantity>;
type AddToCartAction = ReturnType<typeof addToCart>;
type RemoveToCartAction = ReturnType<typeof removeFromCart>;
type ClearedCartAction = ReturnType<typeof clearedCart>;
type IncreasedQuantity = ReturnType<typeof increasedQuantity>;
type DecreasedQuantity = ReturnType<typeof decreasedQuantity>;

export type CartActions = LoadedCartAction | LoadedCartAction | AddToCartAction | RemoveToCartAction | ClearedCartAction | IncreasedQuantity | DecreasedQuantity;

export function loadCart() {
    return async (dispatch: AppDispatch) => {
        const res = await axios.get('/cart')
        // console.log('load cart front data: ',res.data.map((row: any) => [row.item_id, row.quantity.toString()]))
        dispatch(checkResponse(res))
        dispatch(loadedCart(res.data.map((row: any) => [row.item_id, row.quantity.toString()])))
        // dispatch(loadedCart(res.data.map((row: any) => row.item_id)))
    }
}

export function loadCartQuantity() {
    return async (dispatch: AppDispatch) => {
        const res = await axios.get('/cart')
        dispatch(checkResponse(res))
        dispatch(loadedCartQuantity(res.data.map((row:any) => [row.item_id, row.quantity.toString()])))
    }
}

export function fetchAddToCart(item_id: string) {
    return async (dispatch: AppDispatch) => {
        dispatch(addToCart(item_id))
        try {
            const res = await axios.post('/cart', {
                item_id: item_id,
                quantity: 1
            })
            dispatch(checkResponse(res))
            dispatch(loadCart());
            alert('Added to cart')

        } catch (err) {
            // dispatch(removeFromCart(item_id))
            dispatch(loadCart())
        }
    }
}

export function fetchIncreaseQuantity(item_id: string) {
    return async(dispatch: AppDispatch) => {
        dispatch(increasedQuantity(item_id))
        try {
            // const res = await axios.patch('/cartPlus', {
            //     item_id: item_id
            // })
            // dispatch(checkResponse(res));

            dispatch(loadCart());
        } catch (err) {
            dispatch(loadCart());
        }
    }
}

export function fetchDecreaseQuantity(item_id: string) {
    return async(dispatch: AppDispatch) => {
        dispatch(decreasedQuantity(item_id))
        try {
            const res = await axios.patch('/cartMinus', {
                item_id: item_id
            })
            dispatch(checkResponse(res));
            dispatch(loadCart());
        } catch (err) {
            dispatch(loadCart());
        }
    }
}

export function clearCart() {
    return async (dispatch: AppDispatch) => {
        const res = await axios.delete('/cart')
        dispatch(checkResponse(res));
        dispatch(clearedCart());
        // dispatch(loadCart());
    }
}