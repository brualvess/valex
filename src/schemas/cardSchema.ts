import joi from 'joi'

const schemaCard =  joi.object({
	id: joi.number().required(),
	cardType: joi.string().valid('groceries', 'restaurant', 'transport',
     'education', 'health').required()
});
export default schemaCard