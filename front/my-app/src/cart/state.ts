import { LoadingState } from '../Components/model';

export interface CartState {
    item_ids: string[];
    loading: LoadingState;
}