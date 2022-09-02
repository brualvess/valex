import joi from 'joi'

const schemaCard =  joi.object({
	id: joi.number().required(),
	cardType: joi.string().valid('groceries', 'restaurant', 'transport',
     'education', 'health').required()
});

const schemaActivateCard =joi.object({
	id: joi.number().required(),
	cvc: joi.string().length(3).required(),
	password: joi.string().pattern(/^[0-9]+$/).required()
});
const schemaBlockCard = joi.object({
	id: joi.number().required(),
	password: joi.string().pattern(/^[0-9]+$/).required()
});
export {schemaCard, schemaActivateCard, schemaBlockCard}