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

                const token = jwtSimple.encode((user[0]._id), process.env.JWT_SECRET!)
                console.log('login token: ', token)
                return res.json({id: user[0]._id, email: user[0].email, username: user[0].username, token: token });
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
                result
                    ? res.status(200).send(`Successfully created account with email ${email}`)
                    : res.status(500).send('Failed to create a new account')
            } catch (err) {
                logger.error(err);
                res.status(500).json('Internal Server Error');
            }
        })
    }

    // Get account information
    getAccount = async (req: Request, res: Response) => {

        // console.log("userRoutes account ", id);
        try {
            const id = req.user?.id;
            const user = await this.userService.GetAccount(id);

            if (user) {
                // console.log(user);
                res.status(200).json(user);
            } else {
                res.status(400).json('fail')
            }

        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error')
        }


    }

    // Update account details
    patchAccount = async (req: Request, res: Response) => {
        console.log('Enter jor patch but formdata ng work')
        form.parse(req, async (err, fields, files) => {
            try {
                const id = req.user?.id;
                let username = fields.username;
                let contactNumber = fields.contact_number;
                let photo = files.photo != null && !Array.isArray(files.photo) ? files.photo.newFilename : null;
                let address1 = fields.address_1;
                let address2 = fields.address_2;
                let postalCode = fields.postal_code;
                let city = fields.city;
                let state = fields.state;
                let country = fields.country;
                let result = await this.userService.UpdateAccount(id, username, contactNumber, photo, address1, address2, postalCode, city, state, country)
                console.log('Entered user controller')
                console.log('see see yau mo data: ',username)
                console.log('see see result is what: ', result)
                result
                    ? res.status(200).send('Successfully updated your account')
                    : res.status(500).send('Failed to update your Account')
            } catch (err) {
                logger.error(err);
                res.status(500).json('Internal Server Error');
            }
        })
    }
}