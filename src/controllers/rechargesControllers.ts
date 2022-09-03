import { Request, Response } from "express";
import recharge from "../service/rechargesService.js";
import { insert } from "../repositories/rechargeRepository.js";
export default async function recharges(req:Request, res:Response){
   const {id, amount} = req.body
   try{
      const response = await recharge(id, amount)
      await insert(response)
      console.log(response)
      res.status(200).send('Recharge made!')
   }catch(error){
      if (error.code === 'Not Found') {
         return res.sendStatus(404)
     }else if (error.code === 'Unauthorized'){
      return res.sendStatus(401)
   }
    res.sendStatus(500)
   }
}