import {findById} from "../repositories/cardRepository.js";
import { validates } from "./cardsService.js";

export default async function recharge (id: number, amount:number){
    const getCard = await findById(id)
   await validates(id)
    if(getCard.isBlocked === true){
        throw { code: 'Unauthorized' }
    }
    const response = {
        cardId : id,
        amount: amount
    }
    return response
}