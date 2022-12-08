import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { ICategory } from "./category";

enum MotivationLevel {
  siempre,
  usualmente,
  algunas_veces,
  nunca,
}

enum SecurityLevel {
  siempre,
  usualmente,
  algunas_veces,
  nunca,
}

enum InterestLevel {
  escuche,
  aprender,
  indagar,
  creencias,
  no,
}

enum Role {
  Admin,
  Therapist,
  Pacient,
}

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  token?: string;
  confirm?: boolean;
  bearer?: string;
  rol?: Role;
  age?: number;
  sex?: string;
  phone?: string;
  dateOfBirty?: Date;
  direction: string;
  experience?: number;
  emotion?: string[];
  motivation?: MotivationLevel;
  security?: SecurityLevel;
  interest?: InterestLevel;
  type_consult?: ICategory;
  comparePassword: (password: string) => Promise<Boolean>;
  firstLogin?: boolean;
}

console.log(MotivationLevel.usualmente, "acaaaaaaaa");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    token: {
      type: String,
    },
    confirm: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      default: "",
    },
    dateOfBirty: {
      type: Date,
      default: new Date(),
    },
    firstLogin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Este es un middleware para verificar si se modifico el password del usuario
userSchema.pre<IUser>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
