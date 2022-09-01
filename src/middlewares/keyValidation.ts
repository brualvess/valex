import { connection } from "../database.js";
import { Request, Response, NextFunction} from "express";
export async function keyApi(req:Request, res:Response, next:NextFunction){
    const xAPiKey = req.headers['x-api-key']
    const {rows:getKey} = await connection.query(
        `SELECT * FROM companies WHERE "apiKey" = $1`,[xAPiKey]
    )
    if(!getKey[0]){
        return res.status(404).send('Invalid key')
     }
        next()
}
