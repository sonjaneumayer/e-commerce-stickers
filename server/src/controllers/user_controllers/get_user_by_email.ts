import { Request, Response } from 'express'

import { User } from '../../models/model'

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.query
  try {
    // Find the user in the database by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.status(201).json(user)
  } catch (error) {
    console.error('Error during authentication:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}
