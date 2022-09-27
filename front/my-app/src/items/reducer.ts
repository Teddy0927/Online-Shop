import { LoadingState } from '../Components/model';
import { ItemsActions } from './action';
import { Item } from './state';
import produce from 'immer';

export interface ItemState {
    items: Item[],
};

const initialState: ItemState = {
    items: [],
}

export const itemReducer = (state: ItemState = initialState, action: ItemsActions): ItemState => {
    switch (action.type) {
        case '@@/item/LOADED_ONE_ITEM':
        return produce(state, state => {
            const itemIndex = state.items.findIndex(item => item._id === action.item._id)
            if (itemIndex === -1) {
                state.items.push(action.item)
            } else {
                state.items[itemIndex] = action.item
            }
            state.items[itemIndex] = action.item
        })
        // default:
        //     return state;
        case '@@item/LOADED_ITEMS':
            return {
                ...state,
                items: action.items
            }
        case '@@item/LOADED_FRONT_ITEM':
            return {
                ...state,
                items: action.items
            }
    }

    return state
}