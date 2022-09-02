import {
    createCards,
    activateCards
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
        res.sendStatus(201)
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
        res.sendStatus(200)
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