import { ObjectId } from 'mongodb';

export default class item {
    constructor(
        public src: string,
        public alt: string,
        public name: string,
        public style: string,
        public price: number,
        public type: string,
        public id?: ObjectId
        ) {}
}

export interface User {
    id: ObjectId;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}