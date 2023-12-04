import { User } from './../../models/model'
import { Request, Response } from 'express'

import bcrypt from 'bcrypt'

//////// CREATE NEW USER
export const createNewUser = async (req: Request, res: Response) => {
  const newUser = req.body
  console.log(newUser)
  try {
    // Hash the user's password before saving it to the database
    const saltRounds = 10
    if (!newUser.password) {
      throw new Error('Password is required')
    }
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds)
    newUser.password = hashedPassword
    // Create and save the user to the database
    await User.create(newUser)
    // Send a success response with the newly created user data
    res.status(201).json({
      message: 'User created! - New user info:',
      user: newUser,
    })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
