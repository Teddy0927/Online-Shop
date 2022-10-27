import { connectToDatabase } from '../testing';
import { Db, ObjectId } from "mongodb";

export class cartService {
    private dbConnection: Promise<Db>;

    constructor() {
        this.dbConnection = connectToDatabase();
    }

    getCart = async (id: ObjectId | undefined) => {
        let result = await (await this.dbConnection).collection('cart').find({id: {$eq: id}}).toArray();
        console.log(result);
        return result
    }

    getCartQuantity = async(user_id: ObjectId | undefined, item_id: string) => {
        let result = await (await this.dbConnection).collection('cart').find({id: user_id, item_id: item_id}).toArray();
        console.log(result);
        return result
    }

    postCart = async (user_id: ObjectId | undefined, item_id: string, quantity: number) => {
        let result = await (await this.dbConnection).collection('cart').insertOne({user_id, item_id, quantity});
        return result
    }

    deleteCart = async (id: ObjectId | undefined) => {
        let result = await (await this.dbConnection).collection('cart').deleteMany({id: {$eq: id}});
        return result
    }
}