import { connectToDatabase } from '../testing';
import { Db, ObjectId } from "mongodb";

export class cartService {
    private dbConnection: Promise<Db>;

    constructor() {
        this.dbConnection = connectToDatabase();
    }

    getCart = async (id: ObjectId | undefined) => {
        let result = await (await this.dbConnection).collection('cart').find({_id: {$eq: new ObjectId(id)}}).toArray();
        return result
    }

    postCart = async (id: ObjectId | undefined, item_id: string) => {
        let result = await (await this.dbConnection).collection('cart').insertOne({id, item_id});
        return result
    }

    deleteCart = async (id: ObjectId | undefined) => {
        let result = await (await this.dbConnection).collection('cart').deleteMany({id: {$eq: id}});
        return result
    }
}