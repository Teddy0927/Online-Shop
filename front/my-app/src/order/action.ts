import { AppDispatch } from '../store';
import axios from 'axios';
// import { checkResponse } from '../auth/action';
import { Order } from './state';

export function loadedOrder(orders: Order[]) {
    return {
        type: '@@order/LOADED_ORDER' as const,
        orders
    }
}

export function loadedOrderLatest(orders: Order[]) {
    return {
        type: '@@order/LOADED_ORDER_LATEST' as const,
        orders
    }
}

export function paidOrder(_id: string) {
    return {
        type: '@@order/PAID_ORDER' as const,
    }
}

export type LoadedOrderAction = ReturnType<typeof loadedOrder>
export type LoadedOrderLatestAction = ReturnType<typeof loadedOrderLatest>
export type PaidOrderAction = ReturnType<typeof paidOrder>


// export type OrderActions = LoadedOrderAction;
export type OrderActions = LoadedOrderAction | LoadedOrderLatestAction | PaidOrderAction;


export function loadOrder() {
    return async (dispatch: AppDispatch) => {
        const res = await axios.get('/order')
        console.log('data order now: ',res.data)
        // dispatch(checkResponse(res))
        dispatch(loadedOrder(res.data.map((row: any) => row)))
    }
}

export function loadOrderLatest() {
    return async (dispatch: AppDispatch) => {
        const res = await axios.get('/orderLatest')
        // dispatch(checkResponse(res))
        dispatch(loadedOrderLatest(res.data.map((row: any) => row)))
    }
}

export function payOrder(_id: string) {
    return async (dispatch: AppDispatch) => {
        const res = await axios.patch(`/payOrder/${_id}`)
        dispatch(paidOrder(res.data));
        dispatch(loadOrderLatest());
    }
}