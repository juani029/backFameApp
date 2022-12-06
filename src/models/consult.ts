import { model, Schema } from "mongoose";
// import { IUser } from "./user";

export interface IConsult {
  title: string;
  description: string;
  status: number;
  createdAt: Date;
  price: number;
  // type_consult: Object;
  // therapist: IUser;
  // pacient: IUser;
}

const consultSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
  // type_consult: {
  //   type: Schema.Types.ObjectId,
  //   ref: "category",
  //   required: true,
  // },
  // therapist: {
  //   type: Schema.Types.ObjectId,
  //   ref: "user",
  //   required: true,
  // },
  // pacient: {
  //   type: Schema.Types.ObjectId,
  //   ref: "user",
  //   required: true,
  // },
});

export default model<IConsult>("Consult", consultSchema);
