import mongoose, { Schema } from 'mongoose'
import { IUser, IItem, IOrder } from './model_types'

const itemSchema: Schema = new Schema(
  {
    itemName: { type: String, required: true },
    itemPrice: { type: String, required: true },
    itemDescription: { type: String, required: true },
    imagePath: { type: String, required: true },
    itemCategory: { type: String, required: true },
    numOfItems: { type: Number, required: true },
    reduced: { type: Boolean, required: false },
    percentageReduced: { type: Number, required: true },
    quantity: { type: Number, required: false }
  },
  { timestamps: true }
)
const userSchema: Schema = new Schema(
  {
    userName: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {},
    shoppingCart: [itemSchema],
    terms: { type: Boolean, required: true },
    profileImage: { type: String }
  },
  { timestamps: true }
)
const orderSchema: Schema = new Schema(
  {
    //current logged in User
    userId: { type: String, required: true },
    //stripe customer
    customerId: { type: String },
    paymentIntentId: { type: String },
    products: [
      {
        _id: { type: String },
        itemName: { type: String },
        itemPrice: { type: String },
        imagePath: { type: String },
        quantity: { type: Number }
      }
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object },
    deliveryStatus: { type: String },
    paymentStatus: { type: String, required: true },
  },
  { timestamps: true }
)

export const Item = mongoose.model<IItem>('Item', itemSchema)
export const User = mongoose.model<IUser>('User', userSchema)
export const Order = mongoose.model<IOrder>('Order', orderSchema)
