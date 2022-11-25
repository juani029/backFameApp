import jwt from 'jsonwebtoken'
import { IUser } from '../models/user';

const createJWT = (user:IUser) => {
    return jwt.sign({ id:user._id, email: user.email }, 'somesecrettoken', {
        expiresIn: '24h'
    });
}

export default createJWT