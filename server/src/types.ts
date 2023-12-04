import mongoose from "mongoose"

export interface ITokenData {
    _id: mongoose.Types.ObjectId
    email: string
  }