import { Router } from 'express';
import {
    createCard,
    activateCard,
    getBalanceTransaction,
    blockCard,
    unblockCard

} from './controllers/cardsControllers.js';
import joiValidation from './middlewares/joiValidation.js';
import {
    schemaCard,
    schemaActivateCard,
    schemaBlocksCard
} from './schemas/cardSchema.js';
import { keyApi } from './middlewares/keyValidation.js';
import recharges from './controllers/rechargesControllers.js';
import schemaRecharges from './schemas/rechargesSchema.js';

const router = Router()

// routes cards
router.post('/card', joiValidation(schemaCard), keyApi, createCard)
router.put('/activateCard', joiValidation(schemaActivateCard), activateCard)
router.get('/balanceCard/:id', getBalanceTransaction)
router.put('/blockCard', joiValidation(schemaBlocksCard), blockCard)
router.put('/unblockCard', joiValidation(schemaBlocksCard), unblockCard)
// routes recharges
router.post('/recharges',joiValidation(schemaRecharges),keyApi, recharges)
//routes payments
router.post('/payments',joiValidation)

export default router