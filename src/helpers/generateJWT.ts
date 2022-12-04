import jwt from 'jsonwebtoken'
import { IUser } from '../models/user';

const createJWT = (user:IUser) => {
    console.log(user,'el usuario del token')
    return jwt.sign({ id:user._id }, 'somesecrettoken', {
        expiresIn: '24h'
    });
}

export default createJWT