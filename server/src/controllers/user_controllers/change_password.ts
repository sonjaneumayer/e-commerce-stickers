import { Request, Response } from 'express'

import { User } from '../../models/model'

import bcrypt from 'bcryptjs'

/////// CHANGE USER PASSWORD
export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword, _id } = req.body

    // Find the user by their ID
    const user = await User.findById(_id)

    // If the user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Verify that the current password matches the user's actual password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

    // If the current password is incorrect, return a 401 response
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' })
    }

    // If current password is correct, hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update the user's password
    user.password = hashedPassword
    await user.save()

    // Return a 200 response with a success message and the updated user object
    res.status(200).json({ message: 'Password updated successfully', user })
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
