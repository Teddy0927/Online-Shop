import { AppDispatch } from '../store';
import axios from 'axios';
import { Item } from './state';

export function loadedItems(items: Item[]) {
    return {
        type: '@@item/LOADED_ITEMS' as const,
        items
    }
};

export function loadedOneItem(item: Item) {
    return {
        type: '@@item/LOADED_ONE_ITEM' as const,
        item 
    }
}

export function loadedFrontItem(items: Item[]) {
    return {
        type: '@@item/LOADED_FRONT_ITEM' as const,
        items
    }
}

export type LoadedItemsAction = ReturnType<typeof loadedItems>;
export type LoadedOneItemAction = ReturnType<typeof loadedOneItem>;
export type LoadedFrontItemAction = ReturnType<typeof loadedFrontItem>;

export type ItemsActions = LoadedItemsAction | LoadedOneItemAction | LoadedFrontItemAction;

export function loadItems() {
    return async(dispatch: AppDispatch) => {
        const res = await axios.get(`/collection`)

        dispatch(loadedItems(res.data))
    }
}

export function loadOneItem(item_id: string) {
    return async(dispatch: AppDispatch) => {
        const res = await axios.get(`/item/${item_id}`)
        console.log('item loadOne action: ', res)

        if (res.data.length > 0){
            dispatch(loadedOneItem(res.data[0]))
        }
    }
}

export function loadFrontItem(type: string) {
    return async(dispatch: AppDispatch) => {
        // console.log('Type is in here man action: ',type);
        const res = await axios.get(`/collectionFront/${type}`)

        dispatch(loadFrontItem(res.data))
    }
}

