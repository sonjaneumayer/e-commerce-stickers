import { Request, Response } from 'express'
import { User } from '../../models/model'

export const getUserCart = async (req: Request, res: Response) => {
  const { email, items, _id } = req.body
  const user = User.findById({ _id })
  const cart = (await user).shoppingCart
  if (!user) {
    throw new Error('User not found')
  }
  res.status(201).json({
    'The users cart contains:': cart,
  })
}
