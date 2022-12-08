import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db";
import passport from "passport";
import registerRoute from "./routes/registerRoute";
import loginRoute from "./routes/loginRoute";
import userRoute from "./routes/userRoute";
import updateRoute from "./routes/updateRoute";
import confirmRoute from "./routes/confirmRoute";
import passwordRoute from "./routes/passwordRoute";
import stripeRoute from "./routes/stripeRoute";
import consultRoute from "./routes/consultRoute";
import usersRoute from "./routes/usersRoutes";
import { strategy } from "./middleware/passport";

const app = express();
dotenv.config();

connectDB(); //Conexion a la base de datos

//Middlewares
app.use(express.json()); //middleware que transforma la req.body a un json
app.use(morgan("dev")); // Mostrar peticiones
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
//passport.use(strategy);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
//para bloquear una ruta passport.authenticate('jwt',{session:false})
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/user", userRoute);
app.use("/firstLogin", userRoute);
app.use("/users", usersRoute);
app.use("/update", updateRoute);
app.use("/confirm", confirmRoute);
app.use("/forget-password", passwordRoute);
app.use("/payment", stripeRoute);
app.use("/consult", consultRoute);
