export interface Item {
    _id: string;
    photo: string;
    alt: string;
    name: string;
    style: string;
    price: string;
} 
 
export interface Type {
    type: string;
}

export enum LoadingState {
    NotLoaded,
    Loading,
    Loaded
}