import { connectToDatabase } from '../testing';
import { Db } from "mongodb";

export class cartService {
    private dbConnection: Promise<Db>;

    constructor() {
        this.dbConnection = connectToDatabase();
    }

    cart = async () => {
        let result = await (await this.dbConnection).collection('cart').find({}).toArray();
        return result
    }
}