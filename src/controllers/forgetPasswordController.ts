import generateId from "../helpers/generateID";
import { Response, Request } from 'express';
import User from "../models/user";
import { emailForgetPassword } from "../helpers/sendEmail";
import { IUser } from '../models/user';


// Envia un mensaje al usuario para crear una nuevo password
export const forgetPassword = async (req:Request, res:Response):Promise<Response | undefined> => {
    const {email} = req.body
    const user = await User.findOne({email})
    if (user) {
        user.token = generateId()
        await user.save()
        emailForgetPassword({
            name: user.name,
            email: user.email,
            token: user.token
        } as IUser)

        return  res.json({ msg: 'We have sent an email with the instructions', forget: true })
        
    } else {
        return  res.json({ msg: 'User does not exist', forget: false })
     }
}