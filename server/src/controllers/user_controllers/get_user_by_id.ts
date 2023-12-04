import { User } from './../../models/model'
import { Request, Response } from 'express'

export const getUserById = async (req: Request, res: Response) => {
  const { _id } = req.body
  console.log('the request body!!!!:', req.body)
  try {
    const user = await User.findOne(_id)
    console.log(user)
    if (!user) {
      return res.status(404).json({ success: false, message: 'No User found' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}
