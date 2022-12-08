import { json, Request, Response } from "express";
import User from "../models/user";
import createJWT from "../helpers/generateJWT";
import generateId from "../helpers/generateID";
import { emailRegister } from "../helpers/sendEmail";
import { IUser } from "../models/user";

//Permite al usuario hacer login y entrar al sistema
export const login = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { email, password } = req.body;
    //Verificar si ya existe el usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: "The User does not exists", email: false });
    }

    //Comprobar si el usuario esta confirmado
    if (!user.confirm) {
      return res.json({
        msg: "Your account has not been confirmed",
        confirm: false,
      });
    }

    //Comprobar su password
    if (await user?.comparePassword(password)) {
      //Retorna todos los datos del usuario , el token y un booleano para validar que logueo correctamente
      return res.json({
        ...user?.toJSON(),
        token: createJWT(user?._id),
        login: true,
      });
    }
    return res.json({ msg: "The password is wrong", login: false });
  } catch (error) {
    console.log(error);
  }
};

//Permite registrar un nuevo Usuario
export const register = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  //Evitar registros duplicados
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "The User already Exists", register: false });
    }
    const newUser = new User(req.body);
    newUser.token = generateId();
    await newUser.save();
    //Enviar email de confirmacion
    emailRegister({
      name: newUser.name,
      email: newUser.email,
      token: newUser.token,
    } as IUser);

    return res.json({ msg: "User created", register: true });
  } catch (error) {
    console.log(error);
  }
};

//Permite buscar un usuario por id

export const findUserById = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  //Buscamos por id
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    return res.json({
      msg: "User search by id successfully completed",
      user,
      found: true,
    });
  }
  return res.json({ msg: "User search by id Not Found", found: false });
};

//Permite buscar un usuario por email

export const findUserByEmail = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  //Buscamos por id
  const { email } = req.body;
  // console.log(email);
  const user = await User.findOne({ email });
  // console.log("User by email", user);
  if (user) {
    return res.json({
      msg: "User search by email successfully completed",
      user,
      found: true,
    });
  }
  return res.json({ msg: "User Not Found", found: false });
};

//Eliminar usuario por id

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (user) {
    return res.json({ msg: "User deleted", user, deleted: true });
  }
  return res.json({ msg: "User not deleted", deleted: false });
};

// Genera un nuevo password
export const newPassword = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  const { token } = req.params;
  const { password } = req.body;
  //Busca el usuario que tenga el token recibido por params
  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = "";
    try {
      //guarda los nuevos valores
      await user.save();
      //Retorna un mensaje y un estado en true cuando genera la nueva contraseña
      res.json({ msg: "Password modified successfully", newPassword: true });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({ msg: "Invalid Token", newPassword: false });
  }
};

export const findAllUsers = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  try {
    const users = await User.find();
    if (users) {
      return res.json({ msg: "Users successfully found", users, found: true });
    }
    return res.json({ msg: "Users not found", found: false });
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  // Evitar registros duplicados
  const { name, email, age, phone, dateOfBirty, firstLogin } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User doesn't exist", updated: false });
    }

    user.name = name || user.name;
    user.age = age || user.age;
    user.phone = phone || user.phone;
    user.dateOfBirty = dateOfBirty || user.dateOfBirty;
    user.firstLogin = firstLogin || user.firstLogin;
    await user.save();

    return res.json({ msg: "User successfully updated", user, updated: true });
  } catch (error) {
    console.log("Error", error);
    return res.json({ msg: "User updated failed", updated: false });
  }
};

export const updateFirstLoginUser = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      user.firstLogin = true;
      await user.save();
      // console.log("userFirstLogin:", user.firstLogin);
      return res.json({
        msg: "First login modified successfully",
        modified: true,
        user,
      });
    }
    return res.json({ msg: "The user doesn't exist", modified: false });
  } catch (error) {
    console.log("Error", error);
  }
};
