import { json, Request, Response } from 'express';
import User from '../models/user';
import createJWT from '../helpers/generateJWT';
import generateId from '../helpers/generateID';
import { emailRegister } from '../helpers/sendEmail';
import { IUser } from '../models/user';


//Permite al usuario hacer login y entrar al sistema
export const login = async (req: Request, res: Response): Promise<Response | undefined> => {
    try {

        const { email, password, } = req.body
        //Verificar si ya existe el usuario 
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ msg: "The User does not exists", email: false })
        }

        //Comprobar si el usuario esta confirmado
        if (!user.confirm) {
            return res.json({msg: 'Your account has not been confirmed', confirm: false })
        }


        //Comprobar su password
        if (await user?.comparePassword(password)) {
            //Retorna todos los datos del usuario , el token y un booleano para validar que logueo correctamente
            return res.json({
                ...user?.toJSON(),
                token: createJWT(user?._id),
                login: true
            })
        }
        return res.json({ msg: "The password is wrong", login: false })


    } catch (error) {
        console.log(error)
    }

}

//Permite registrar un nuevo Usuario
export const register = async (req: Request, res: Response): Promise<Response | undefined> => {
    //Evitar registros duplicados
    const { email } = req.body
   try {
    const user = await User.findOne({ email })
    if (user) {
        return res.json({ msg: "The User already Exists", register: false })
    }
    const newUser = new User(req.body)
    newUser.token = generateId()
    await newUser.save()
    //Enviar email de confirmacion
    emailRegister({
        name:newUser.name,
        email:newUser.email,
        token:newUser.token
    }as IUser)

    return res.json({msg:"User created", register:true})
   } catch (error) {
    console.log(error)
   }
}

//Permite buscar un usuario por id

export const findUserById = async (req: Request, res: Response):Promise<Response | undefined> => {
  //Buscamos por id
  const {id} = req.params
  const user = await User.findById(id)
  if(user) {
    return res.json({msg:"User successfully found", user, found: true})
  }
  return res.json({msg:"User Not Found", found: false})
}

//Eliminar usuario por id

export const deleteUserById = async (req: Request, res: Response):Promise<Response | undefined> => {
  const {id} = req.params
  const user = await User.findByIdAndDelete(id)
  if(user){
    return res.json({msg:"User deleted", user, deleted: true})
  }
  return res.json({msg: "User not deleted", deleted: false})
}

// Genera un nuevo password
export const newPassword = async (req: Request, res: Response): Promise<Response | any> => {
    const { token } = req.params
    const { password } = req.body
    //Busca el usuario que tenga el token recibido por params
    const user =  await User.findOne({token})

    if (user) {
        user.password = password
        user.token = ''
        try {
            //guarda los nuevos valores
            await user.save()
            //Retorna un mensaje y un estado en true cuando genera la nueva contraseña
            res.json({ msg: 'Password modified successfully',newPassword:true })
        } catch (error) {
            console.log(error)
        }
    } else {
        res.json({ msg: 'Invalid Token',newPassword:false })
    }
}

export const findAllUsers = async (req: Request, res: Response): Promise<Response | any> => {
    const users = await User.find()
    if(users) {
        return res.json({msg:'Users successfully found', users, found: true})
    }
    return res.json({msg:'Users not found', found: false})
}

export const updateUser = async (req: Request, res: Response): Promise<Response | any> => {
   // Evitar registros duplicados
   const {email, age, sex, phone, dateOfBirty, direction, experience, emotion, motivation, security, interest }=req.body;
   const user = await User.findOne({ email })
   if (!user) {
    return res.json({ update:false})
   }

   user.age = age || user.age
   user.sex = sex || user.sex
   user.phone = phone || user.phone
   user.age = dateOfBirty || user.dateOfBirty
   user.age = direction || user.direction
   user.age = experience || user.experience
   user.emotion = emotion || user.emotion
   user.motivation = motivation || user.motivation
   user.security = security || user.security
   user.interest = interest || user.interest
   user.experience = experience || user.experience
   

   await user.save()

   return res.json({msg:'User successfully updated', user, updated:true})

}

