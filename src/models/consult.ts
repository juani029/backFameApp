import {model,Schema} from 'mongoose'
import { IUser } from './user';

export interface IConsult {
    titulo:string;
    description:string;
    type_consult:Object;
    therapist:IUser;
    status:number;
    createAt:Date;
    pacient:IUser
};

const consultSchema = new Schema({

   titulo:{
      type:String,
      required:true,
      unique:true
   },
   description:{
      type:String
   },
   type_consult:{
    type: Schema.Types.ObjectId, ref:'category',
    required:true,
   },
   therapist:{
     type: Schema.Types.ObjectId, ref:'user',
     required:true,
   },
   pacient:{
     type: Schema.Types.ObjectId, ref:'user',
     required:true,
   },
   status:{
    type:Number,
    default:1
   },
   createAt:{
    type:Date,
    default:Date.now
   }
})

export default model<IConsult>("Consult",consultSchema);