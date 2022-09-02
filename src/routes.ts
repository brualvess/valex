import { Router } from 'express';
import {
    createCard,
    activateCard

} from './controllers/cardsControllers.js';
import joiValidation from './middlewares/joiValidation.js';
import { schemaCard, schemaActivateCard } from './schemas/cardSchema.js';
import { keyApi } from './middlewares/keyValidation.js';

const router = Router()

router.post('/card', joiValidation(schemaCard), keyApi, createCard)
router.put('/card', joiValidation(schemaActivateCard), activateCard)
export default router