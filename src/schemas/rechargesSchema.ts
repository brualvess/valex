import joi from "joi";

 const schemaRecharges=  joi.object({
	id: joi.number().required(),
	amount : joi.number().min(1).required()
});
export default schemaRecharges;