import { ICategory } from "./category"
import { IUser } from "./user"

export interface IProduct {
  _id?:string
  name?:string
  description?:string
  price?:number
  paymentOptions?:{
    haveCash?:boolean,
    haveCredit?:boolean
  }
  delivery?:{
    courier?:boolean,
    express?:boolean,
    handover?:boolean
  }
  category?:ICategory
  merchant?:IUser
  inventory?:number
  createdAt?:Date
  updatedAt?:Date
  isDeleted?:boolean
}