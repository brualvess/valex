import {
    createCards,
    activateCards,
    findBalanceTransaction,
    block
} from "../service/cardsService.js";
import { Request, Response } from "express";
import {
    insert,
    update
} from "../repositories/cardRepository.js";

export async function createCard(req: Request, res: Response) {
    const { id, cardType } = req.body
    try {
        const response = await createCards(id, cardType)
        await insert(response)
        res.status(201).send('card created!')
    } catch (error) {
        if (error.code === 'Not Found') {
            return res.sendStatus(404)
        } else if (error.code === 'Unauthorized') {
            return res.sendStatus(401)
        }
        res.sendStatus(500)
    }
}
export async function activateCard(req: Request, res: Response) {
    const { id, cvc, password } = req.body
    try {
        const response = await activateCards(id, cvc, password)
        await update(id, response )
        res.status(200).send('Activated card')
    } catch (error) {
        if (error.code === 'Not Found') {
            return res.sendStatus(404)
        } else if (error.code === 'Unauthorized') {
            return res.sendStatus(401)
        } else if (error.code === 'Unauthorized') {
            return res.sendStatus(401)
        }
        res.sendStatus(500)
    }
}
export async function getBalanceTransaction(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    try{
       const result = await findBalanceTransaction(id)
       
        res.status(200).send(result)
    }catch(error){
        if (error.code === 'Not Found') {
            return res.sendStatus(404)
        }
        res.sendStatus(500)
    }
    
}

export async function blockCard(req:Request, res:Response){
    const {id, password} = req.body
    try{
        const result = await block(id, password)
        await update (id, result)
        res.status(200).send('card successfully blocked!')
    }catch(error){
        if (error.code === 'Not Found') {
            return res.sendStatus(404)
        }else if (error.code === 'Unauthorized'){
           return res.sendStatus(401)
        }
        res.sendStatus(500)
    }

}
