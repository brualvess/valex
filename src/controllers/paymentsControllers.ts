import { Request, Response } from "express";
import payment from "../service/paymentsService.js";
import { insert } from "../repositories/paymentRepository.js";
export default async function payments(req: Request, res: Response) {
    const { cardId, password, businessId, amount } = req.body
    try {
        const response = await payment(cardId, password,
             businessId, amount)
             await insert (response)
        res.status(200).send('payment made successfully!')
    } catch (error) {
        if (error.code === 'Not Found') {
            return res.sendStatus(404)
        } else if (error.code === 'Unauthorized') {
            return res.sendStatus(401)
        }
        res.sendStatus(500)
    }



}