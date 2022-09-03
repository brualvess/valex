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

const router = Router()

// routes cards
router.post('/card', joiValidation(schemaCard), keyApi, createCard)
router.put('/card', joiValidation(schemaActivateCard), activateCard)
router.get('/card/:id', getBalanceTransaction)
router.put('/blockCard', joiValidation(schemaBlocksCard), blockCard)
router.put('/unblockCard', joiValidation(schemaBlocksCard), unblockCard)
// routes recharges
export default router