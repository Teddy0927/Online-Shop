import { connectToDatabase } from '../testing';
import { Db } from "mongodb";

export class userService {
    private dbConnection: Promise<Db>;

    constructor() {
        this.dbConnection = connectToDatabase();
    }

    Login = async (email: string) => {
        let result = await (await this.dbConnection).collection('users').find({email: email}).toArray();
        return result
    }
}