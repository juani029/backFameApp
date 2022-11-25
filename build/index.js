"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./src/config/db"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); //middleware que transforma la req.body a un json
dotenv_1.default.config();
//Conexion a la base de datos
(0, db_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
