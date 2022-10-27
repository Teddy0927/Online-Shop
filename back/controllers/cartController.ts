import { Request, Response } from 'express';
import { cartService } from '../services/cartServices';
import { logger } from '../util/logger';
// import { form } from '../util/middleware';
// import { connectToDatabase } from '../testing';
// import { Db } from 'mongodb';

export class cartController {
    // private dbConnection: Promise<Db>;
    constructor(
        private cartService: cartService
    ) {
        // this.dbConnection = connectToDatabase();
    }

    getCart = async (req: Request, res: Response) => {
        const id = req.user?.id;
        try {
            const cart = await this.cartService.getCart(id);
            if (cart) {
                res.status(200).json(cart);
            } else {
                res.json('fail')
            }

        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error')
        }

    }

    getCartQuantity = async (req: Request, res: Response) => {
        const user_id = req.user?.id;
        console.log('getCartQ user: ', user_id)
        const item_id = req.params.id;
        console.log('getCartQ item: ', item_id)
        try {
            const cart = await this.cartService.getCartQuantity(user_id, item_id)
            console.log('get cart quan: ',cart)
            if (cart) {
                res.status(200).json(cart[0].quantity);
            } else {
                res.json('fail')
            }
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error');
        }
    }

    postCart = async (req: Request, res: Response) => {
        try {
            let user_id = req.user?.id;
            let item_id = req.body.item_id
            let quantity = req.body.quantity
            // const cart = await (await this.dbConnection).collection('cart').insertOne({id, item_id});
            const cart = await this.cartService.postCart(user_id, item_id, quantity);
            cart
                ? res.status(201).send(`Successful added a item to cart with id ${cart.insertedId}`)
                : res.status(500).send('Failed to add a item to cart')
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error');
        }
    }

    deleteCart = async (req: Request, res: Response) => {
        try {
            let id = req.user?.id;
            const cart = await this.cartService.deleteCart(id);
            cart
                ? res.status(200).send(`Successfully cleared the cart with deleted count ${cart.deletedCount}`)
                : res.status(500).send('Failed to clear the cart')
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error');
        }
    }
    
}