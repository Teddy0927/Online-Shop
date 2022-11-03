import { connectToDatabase } from '../testing';
import { Db, ObjectId } from "mongodb";
import { Cart } from '../models';

export class orderService {
    private dbConnection: Promise<Db>;

    constructor() {
        this.dbConnection = connectToDatabase();
    }

    getOrder = async (user_id: ObjectId | undefined) => {
        let result = await (await this.dbConnection).collection('order').find({user_id: {$eq: user_id}}).toArray();
        return result
    }

    getOrderLatest = async (user_id: ObjectId | undefined) => {
        let result = await (await this.dbConnection).collection('order').find({user_id: {$eq: user_id}}).limit(1).sort({$natural: -1}).toArray();
        return result
    }

    getOrderAdmin = async () => {
        let result = await (await this.dbConnection).collection('order').find({}).toArray();
        return result
    }

    postOrder = async(user_id: ObjectId | undefined, email: string, phoneNumber: string, firstName: string, lastName: string, address1: string, address2: string, city: string, country: string, postalCode: string, state: string, carts: Cart[], displayMoney: string, shippingMethod: string, status: string) => {
        let result = await (await this.dbConnection).collection('order').insertOne({user_id, email, phoneNumber, firstName, lastName, address1, address2, city, country, postalCode, state, carts, displayMoney, shippingMethod, status, lastModified: new Date()})
        return result
    }

    patchPayOrder = async (order_id: string) => {
        let result = await (await this.dbConnection).collection('order').updateOne({_id: new ObjectId(order_id)}, {$set: {status: 'Pending', lastModified: new Date()}})
        return result
    }

    patchOrderStatus = async (order_id: string, status: string) => {
        let result = await (await this.dbConnection).collection('order').updateOne({_id: new ObjectId(order_id)}, {$set: {status: status, lastModified: new Date()}})
        return result
    }
}