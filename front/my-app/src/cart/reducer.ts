import { CartActions } from './action'
import { LoadingState } from '../Components/model';
import { CartState } from './state';
import produce from 'immer';

const initialState: CartState = {
    item_ids: [],
    loading: LoadingState.NotLoaded,
}

export function cartReducer(state: CartState = initialState, action: CartActions): CartState {
    switch (action.type) {
        case '@@cart/LOADED_CART':
            return {
                ...state,
                loading: LoadingState.Loaded,
                item_ids: action.item_ids
            }
        case '@@cart/ADD_TO_CART':
            return produce(state, state => {
                state.item_ids.push(action.item_id)
                state.item_ids.sort()
            })
        case '@@cart/REMOVE_FROM_CART':
            return produce(state, state => {
                const index = state.item_ids.indexOf(action.item_id)
                state.item_ids.splice(index, 1)
            })
        case '@@cart/CLEARED_CART':
            return {
                ...state,
                item_ids: []
            }
    }
    return state;
}
