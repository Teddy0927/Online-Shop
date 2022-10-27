import { LoadingState } from "../Components/model";

export interface Item {
    alt: string,
    name: string,
    style: string,
    price: string,
    type: string,
    photo: string,
    _id: string,
    quantity: number | undefined
}

export interface ItemState {
    loading: LoadingState;
    items: Item[];
}