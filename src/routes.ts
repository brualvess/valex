import { Router } from 'express';
import {
    createCard,
    activateCard,
    getBalanceTransaction,
    blockCard

} from './controllers/cardsControllers.js';
import joiValidation from './middlewares/joiValidation.js';
import {
    schemaCard,
    schemaActivateCard,
    schemaBlockCard
} from './schemas/cardSchema.js';
import { keyApi } from './middlewares/keyValidation.js';

const router = Router()

// routes cards
router.post('/card', joiValidation(schemaCard), keyApi, createCard)
router.put('/card', joiValidation(schemaActivateCard), activateCard)
router.get('/card/:id', getBalanceTransaction)
router.put('/blockCard', joiValidation(schemaBlockCard), blockCard)
// routes recharges
export default router