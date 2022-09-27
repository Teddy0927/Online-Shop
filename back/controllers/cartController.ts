import { Request, Response } from 'express';
import { cartService } from '../services/cartServices';
import { logger } from '../util/logger';
import { form } from '../util/middleware';
import { connectToDatabase } from '../testing';
import { ObjectId, Db } from 'mongodb';

export class cartController {
    private dbConnection: Promise<Db>;
    constructor(
        private cartService: cartService
    ) {
        this.dbConnection = connectToDatabase();
    }

    getCart = async (req: Request, res: Response) => {
        const id = req.user?.id;
        try {
            const cart = await (await this.dbConnection).collection('cart').find({_id: {$eq: id}}).toArray();
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

    postCart = async (req: Request, res: Response) => {
        try {
            let id = req.user?.id;
            let item_id = req.body.item_id
            const cart = await (await this.dbConnection).collection('cart').insertOne({id, item_id});

            cart
                ? res.status(201).send(`Successful added a item to cart with id ${cart.insertedId}`)
                : res.status(500).send('Failed to add a item to cart')
            res.end;

        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error');
        }
    }

    getItems = async (req: Request, res: Response) => {
        try {
            const items = await this.cartService.cart();

            if (items) {
                res.status(200).json(items);
            } else {
                res.json({ status: 'fail', result: ['Fail to get items'] })
            }
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error');
        }
    };

    getItemsByCol = async (req:Request, res: Response) => {
        try {
            const id = req.params.id;
            const result = await (await this.dbConnection).collection('items').find({type: {$eq: id}}).toArray();

            if (result) {
                res.status(200).json(result);
            } else {
                res.json({ status: 'fail', result: ['Fail to get items'] })    
            }
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error')
        }
    }

    getItemsFrontByCol = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const result = await (await this.dbConnection).collection('items').find({type: {$eq: id}}).limit(4).toArray();

            if (result) {
                res.status(200).json(result);
            } else {
                res.json({ status: 'fail', result: ['Fail to get items'] })    
            }
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error')
        }
    }

    createItem = async (req: Request, res: Response) => {
        form.parse(req, async (err, fields, files) => {
            try {
                let src = fields.src;
                let alt = fields.alt;
                let name = fields.name;
                let style = fields.style;
                let price = fields.price;
                let type = fields.type;
                let photo = files.photo != null && !Array.isArray(files.photo) ? files.photo.newFilename : null;
                let result = await (await (this.dbConnection)).collection('items').insertOne({ src, alt, name, style, price, type, photo });

                result
                    ? res.status(201).send(`Successfully created a new item with id ${result.insertedId}`)
                    : res.status(500).send('Failed to create a new item')
                res.end;
            } catch (err) {
                logger.error(err);
                res.status(500).json('Internal Server Error');
            }
        })
    };

    updateItem = async (req: Request, res: Response) => {
        const id = req.params.id;
        form.parse(req, async (err, fields, files) => {
            try {
                const query = { _id: new ObjectId(id) };
                let src = fields.src;
                let alt = fields.alt;
                let name = fields.name;
                let style = fields.style;
                let price = fields.price;
                let type = fields.type;
                let photo = files.photo != null && !Array.isArray(files.photo) ? files.photo.newFilename : null;
                let result = await (await (this.dbConnection)).collection('items').updateOne(query, {$set: { src, alt, name, style, price, type, photo }});
                console.log(result);
                result
                    ? res.status(200).send(`Successfully patched a item with new id ${id}`)
                    : res.status(304).send(`Failed to update a item with id ${id}`)
                res.end;
            } catch (err) {
                logger.error(err);
                res.status(500).json('Internal Server Error');
            }
        })
    };

    deleteItem = async (req: Request, res: Response) => {
        try {

        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error');
        }
    };

}