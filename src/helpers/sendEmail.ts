import nodemailer, { SendMailOptions } from "nodemailer";
import { IUser } from "../models/user";

// Funcion para enviar correo de confirmacion al usuario

export const emailRegister = async (data: IUser) => {
  const { name, email, token } = data;

  const transport = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  } as SendMailOptions);
  //Valida que la funcion este trabajando correctamente
  transport.verify().then(() => {
    console.log("Ready send email");
  });

  //Aqui se maneja la vista del mensaje del correo
  let mailOptions = {
    from: `"Fame App"" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Fame App - Verifica tu cuenta",
    text: "Verificar cuenta de Fame App",
    html: `<p>Hola: ${name} Verifca tu cuenta en Fame App</p>
         <p>Tu cuenta está casi lista, solo tienes que verificarla en el siguiente enlace: </p>
        <a href="http://localhost:5173/confirm/${token}">Verificar Cuenta</a>

        <p>Si no creaste esta cuenta, puedes ignorar este mensaje</p>
    
    `,
  };
  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: " + info.response);
  });
  //res.send('enviando')
};

//Funcion para enviar correo de olvido de password
export const emailForgetPassword = async (data: IUser) => {
  const { name, email, token } = data;
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.PORT,
    secure: true,
    // secureConnection: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  } as SendMailOptions);

  transport.verify().then(() => {
    console.log("Ready send password");
  });

  //Aqui se maneja la vista del mensaje del correo

  let mailOptions = {
    from: `"Fame App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Fame App - Resetear el Password",
    text: "Resetear el Password",
    html: `<p>Hola: ${name} Ha solicitado restablecer su contraseña</p>
             <p>Siga el siguiente enlace para generar una nueva contraseña: </p>
            <a href="${process.env.FRONTEND_URL}/reset/${token}">Reset your password</a>
            <p>Si no solicitó este correo electrónico, puede ignorar este mensaje</p>
        `,
  };
  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: " + info.response);
  });
  //res.send('enviando')
};
