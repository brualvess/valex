import { Router } from 'express';
import { createCard } from './controllers/cardsControllers.js';
import joiValidation from './middlewares/joiValidation.js';
import schemaCard from './schemas/cardSchema.js';
import { keyApi } from './middlewares/keyValidation.js';

const router = Router()

router.post('/card', joiValidation(schemaCard), keyApi, createCard)
export default router