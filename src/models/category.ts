import {model,Schema} from 'mongoose'


export interface ICategory {
   type:string;

};

const categorySchema = new Schema({
   type:{
    type:String
   }
 
})

export default model<ICategory>("Category",categorySchema);