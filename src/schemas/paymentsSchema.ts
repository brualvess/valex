import joi from 'joi';
const schemaPayments =  joi.object({
	cardId: joi.number().required(),
    password: joi.string().pattern(/^[0-9]+$/).required(),
	businessId: joi.number().required(),
    amount : joi.number().min(1).required()
});
export default schemaPayments;