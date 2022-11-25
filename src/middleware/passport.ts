import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt'
import User from '../models/user';

const options:StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'somesecrettoken'
};

 const strategy = new Strategy(options, async (payload,done)=>{
    console.log(payload,'acaaaa')
     try {
        const user = await User.findById(payload.id);
        if (user) {
            return done(null,user);
        }
        return done(null, false);

     } catch (error) {
        console.log(error)
     }
})

export default strategy