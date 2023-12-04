import mongoose, { Document } from 'mongoose'

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  userName: string | null
  email: string
  password: string
  address: {
    firstName: string
    lastName: string
    streetName: string
    houseNumber: number
    postCode: number
    city: string
    country: string
  } | null
  shoppingCart: object[] | null
  terms: boolean
  profileImage: string
}

export interface IItem extends Document {
  _id: mongoose.Types.ObjectId
  itemName: string
  itemPrice: string
  itemDescription: string
  imagePath: string
  itemCategory: string
  numOfItems: number
  reduced?: boolean
  percentageReduced?: number
  quantity?: number
}

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId
  userId: string
  customerId: string
  paymentIntentId: string
  products: IOrderItem
  subtotal: number
  shipping: object
  deliveryStatus: string
  paymentStatus: string
}

export interface IOrderItem {
  itemId: string
  itemName: string
  imagePath: string
  itemPrice: string
  quantity: number
}


