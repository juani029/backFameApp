import User from "../models/user";
import { Request, Response } from 'express';


//Verifica que el token valido y existente en la base de datos
export const checkToken = async (req:Request, res:Response):Promise<Response | any> => {
    const {token} = req.params

    const validToken = await User.findOne({token})

    if (validToken) {
        res.json({ msg: 'Valid token and user exists', token: true })
    } else {
        res.json({ msg: 'Invalid Token', token: false })
    }
}