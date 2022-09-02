import { faker } from '@faker-js/faker';
import dayjs from 'dayjs'
import { findById } from "../repositories/employeeRepository.js";
import {
    findByTypeAndEmployeeId,
    TransactionTypes,
    findById as cardFindById
} from "../repositories/cardRepository.js";
import Cryptr from 'cryptr';
import { number } from 'joi';


const cryptr = new Cryptr('myTotallySecretKey')


export async function createCards(id: number, cardType: TransactionTypes) {
    const registeredEmployees = await findById(id)
    const verifyCardType = await findByTypeAndEmployeeId(cardType, id)
    if (!registeredEmployees) {
        throw { code: 'Not Found' }
    }
    if (verifyCardType) {
        throw { code: 'Unauthorized' }
    }
    const cardNumber = faker.finance.creditCardNumber()
    const expirationDate = dayjs().add(5, 'year').locale('pt-br').format('MM-YY')
    const cvv = faker.finance.creditCardCVV()
    const encryptedCvv = cryptr.encrypt(cvv);
    let holderName = registeredEmployees.fullName

    let separateString = holderName.split(' ')
    let name = [separateString[0]]
    for (let i = 1; i < separateString.length - 1; i++) {
        if (separateString[i].length >= 3) {
            name.push(separateString[i][0])
        }
    }
    name.push(separateString[separateString.length - 1])
    let nameString = name.join(' ').toUpperCase()
    const result = {
        number: cardNumber,
        employeeId: id,
        cardholderName: nameString,
        securityCode: encryptedCvv,
        expirationDate: expirationDate,
        isVirtual: false,
        isBlocked: true,
        type: cardType
    }
    return result
}

export async function activateCards(id: number, cvc: string, password: string) {
    const registeredCard = await cardFindById(id)
    const currentDate = dayjs().locale('pt-br').format('MM-YY')
   
    if (!registeredCard) {
        throw {code: 'Not Found'}
    }
    if(registeredCard.expirationDate < currentDate || password.length != 4){
        throw {code: 'Unauthorized'}
    }
    if(registeredCard.password != null){
        throw {code: 'Unauthorized'}
    }
    const encryptedCvc = registeredCard.securityCode

    const decryptedString = cryptr.decrypt(encryptedCvc);
    if(cvc != decryptedString){
        throw {code: 'Unauthorized'}
    }
   
   const encryptedPassword = cryptr.encrypt(password);
   const datas = {
    password: encryptedPassword,
    isBlocked: false
   }
   return datas
}

