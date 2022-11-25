import User from "../models/user";
import { Response, Request } from 'express';

//Cambia la propiedad confirm del usuario en true para loguearse en el sistema
export const confirm = async (req:Request, res:Response):Promise<Response | any> => {
    const {token} = req.params
    const user = await User.findOne({token})
    if (user) {
        user.confirm = true
        user.token = ''
        await user.save()
        return res.json({ msg: 'User confirmed successfully',userConfirm:true })
    } else {
        return res.json({ msg: 'Invalid token',userConfirm:false })
    }
}