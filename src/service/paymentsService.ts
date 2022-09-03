import { validates, validateSenhaCard } from "./cardsService.js";
import { findById } from "../repositories/cardRepository.js";
import { findById as business } from "../repositories/businessRepository.js";
import { findByCardId as recharges } from '../repositories/rechargeRepository.js';
import { findByCardId } from '../repositories/paymentRepository.js';
export default async function payment(cardId: number, password: string,
    businessId: number, amount: number) {
    await validates(cardId);
    await validateSenhaCard(cardId, password);
    const getCard = await findById(cardId)
    if (getCard.isBlocked === true) {
        throw { code: 'Unauthorized' }
    }
    const getBusiness = await business(businessId);
    if (!getBusiness) {
        throw { code: 'Not Found' }
    }
    if (getCard.type != getBusiness.type) {
        throw { code: 'Unauthorized' }
    }
    const resultPayments = await findByCardId(cardId)
    const sumShopping = resultPayments.reduce((sum, a) => sum + a.amount, 0);
    const resultRecharges = await recharges(cardId)
    const sumRecharges = resultRecharges.reduce((sum, a) => sum + a.amount, 0);
    const balance = sumRecharges - sumShopping
    if(balance < amount){
        throw { code: 'Unauthorized' }
    }
 const result = {
    cardId : cardId,
    businessId: businessId,
    amount: amount
 }
 return result
}