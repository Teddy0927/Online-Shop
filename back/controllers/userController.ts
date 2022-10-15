import { Request, Response } from 'express';
import { userService } from '../services/userServices';
import { logger } from '../util/logger';
import { form } from '../util/middleware';
import jwtSimple from 'jwt-simple';
import { hashPassword, checkPassword  } from '../util/hash';
import { connectToDatabase } from '../testing';
import { Db } from 'mongodb';

export class userController {
    private dbConnection: Promise<Db>;
    constructor(
        private userService: userService
    ) {
        this.dbConnection = connectToDatabase();
    }

    // Get account information
    getAccount = async (req: Request, res: Response) => {
        const id = req.user?.id;
        console.log("userRoutes account ", id);
        // const user = await this.userService.Account(id);
        // if (user.length === 0) {
        //     return res.status(404);
        // }


    }

    updateAccount = async (req: Request, res: Response) => {

    }
    // check if inputs include &*:
    // phone / email login
    login = async (req: Request, res: Response) => {
        try {
            let email = req.body.email;
            let password = req.body.password;
            const user = await this.userService.Login(email);

            if (user.length === 0) {
                return res.status(404);
            }

            if (await checkPassword(password, user[0].password)) {
                console.log('User: ', user[0].username, ' just logged in. With ObjID: ', user[0]._id);

                // const token = jwtSimple.encode(user[0]._id, )
                return res.json({id: user[0]._id, email: user[0].email, username: user[0].username, token: jwtSimple.encode({
                    userId: user[0]._id
                }, process.env.JWT_SECRET!) });
            } else {
                return res.status(400).json({result: 'wrong_password'});
            }

        } catch (err) {
            logger.error(err);
            return res.status(500).json('Internal Server Error');
        }
    }

    // email verification
    // phone verification
    // jose jwt
    register = async (req: Request, res: Response) => {
        form.parse(req, async (err, fields, files) => {
            try {
                let email = fields.email;
                let username = fields.username;
                let password = await hashPassword(fields.password as string);
                let contactNumber = fields.contact_number;
                let photo = files.photo != null && !Array.isArray(files.photo) ? files.photo.newFilename : null;
                let result = await (await (this.dbConnection)).collection('users').insertOne({email, username, password, contactNumber, photo});
                console.log(result.insertedId);
                result
                    ? res.status(200).send(`Successfully create account with email ${email}`)
                    : res.status(500).send('Failed to create a new account')
            } catch (err) {
                logger.error(err);
                res.status(500).json('Internal Server Error');
            }
        })
    }
}