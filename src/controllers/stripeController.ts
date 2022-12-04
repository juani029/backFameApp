import {Request, Response} from 'express'
import User from '../models/user'

export const postStripe = async (req: Request, res:Response) :Promise<Response | undefined> => {
    try {
        const {id, amount, email} = req.body
        const user = await User.findOne({email})
        if(user) {
            return res.json({msg:'received'})
        }
    } catch (error) {
        console.log(error)
    }
}