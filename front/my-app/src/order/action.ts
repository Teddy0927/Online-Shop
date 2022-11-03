import { AppDispatch } from '../store';
import axios from 'axios';
// import { checkResponse } from '../auth/action';
import { Order } from './state';
import { checkResponse } from '../auth/action';

export function loadedOrder(orders: Order[]) {
    return {
        type: '@@order/LOADED_ORDER' as const,
        orders
    }
}

export function loadedOrderAdmin(orders: Order[]) {
    return {
        type: '@@order/LOADED_ORDER_ADMIN' as const,
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

export function editedOrderStatus(_id: string, status: string) {
    return {
        type: '@@order/EDITED_ORDER_STATUS' as const
    }
}

export type LoadedOrderAction = ReturnType<typeof loadedOrder>
export type LoadedOrderAdminAction = ReturnType<typeof loadedOrderAdmin>
export type LoadedOrderLatestAction = ReturnType<typeof loadedOrderLatest>
export type PaidOrderAction = ReturnType<typeof paidOrder>
export type EditedOrderStatusAction = ReturnType<typeof editedOrderStatus>


export type OrderActions = LoadedOrderAction | LoadedOrderLatestAction | LoadedOrderAdminAction | PaidOrderAction | EditedOrderStatusAction;


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
        dispatch(loadedOrderLatest(res.data.map((row: any) => row)))
    }
}

export function loadOrderAdmin() {
    return async (dispatch: AppDispatch) => {
    const res = await axios.get('/orderAdmin')
    console.log(res)
    dispatch(loadedOrderAdmin(res.data.map((row: any) => row)))
}
}

export function payOrder(_id: string) {
    return async (dispatch: AppDispatch) => {
        const res = await axios.patch(`/payOrder/${_id}`)
        dispatch(paidOrder(res.data));
        dispatch(loadOrderLatest());
    }
}

export function editOrderStatus(_id: string, status: string) {
    return async (dispatch: AppDispatch) => {
        const res = await axios.patch(`/orderStatus/${_id}`, {status: status})
        dispatch(checkResponse(res));
        dispatch(loadOrderAdmin())
    }
}