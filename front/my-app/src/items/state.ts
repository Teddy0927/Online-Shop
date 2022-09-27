import { LoadingState } from "../Components/model";

export interface Item {
    alt: string,
    name: string,
    style: string,
    price: string,
    type: string,
    photo: string,
    _id?: string
}

export interface ItemState {
    loading: LoadingState;
    Items: Item[];
}