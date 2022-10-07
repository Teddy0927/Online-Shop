import express from 'express'
import { Bearer } from 'permit';
import jwtSimple from 'jwt-simple';
import formidable from 'formidable';
import { connectToDatabase } from '../testing';
import { v4 } from 'uuid';
import 'dotenv/config';

import fs from 'fs';


const permit = new Bearer({
    query: 'access_token'
});

export const uploadDir = 'uploads';
fs.mkdirSync(uploadDir, { recursive: true });

export const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 200 * 1024 * 1024 ** 2, // the default limit is 200KB,
    // filter: part => part.mimetype?.startsWith('image/') || false, // for reference (might be hacked)
})

export const userMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = permit.check(req)
    console.log('token result: ', token)
    try {
        const payload = jwtSimple.decode(token, process.env.JWT_SECRET!)
        req.user = {
            id: payload.userID
        }
        console.log('Enter jor uM try');
        console.log('req.user try is: ', req.user);
        next();
    } catch (err) {
        const db = connectToDatabase();
        let username = v4();
        let password = "";
        const newUser = (await (await db).collection('users').insertOne({ username, password })).insertedId;
        console.log('Enter jor uM catch');
        req.user = {
            id: newUser
        }
        console.log('req.user catch is: ', req.user);
        const payload = {
            userID: newUser
        }

        const jwt = jwtSimple.encode(payload, process.env.JWT_SECRET!);
        res.header('TEMP-TOKEN', jwt);

        next();
    }

}

// export const isLogin = (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
// ) => {
//     const token = permit.check(req);
//     try {
//         const payload = jwtSimple.decode(token, '1234')

//         if (payload['email']) {
//             // req.user.email for login required page
//             req.user = {
//                 email: payload['email']
//             }
//             next();
//         } else {
//             res.status(401).json({ result: 'unauthorized' });
//         }
//     } catch (err) {
//         res.status(401).json({result: 'incorrect_token'});
//     }
// }