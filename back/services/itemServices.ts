import { connectToDatabase } from '../testing';
import { Db } from "mongodb";

export class itemService {
    private dbConnection: Promise<Db>;

    constructor() {
        this.dbConnection = connectToDatabase();
    }

    itemAll = async () => {
        let result = await (await this.dbConnection).collection('items').find({}).toArray();
        return result
    }
}