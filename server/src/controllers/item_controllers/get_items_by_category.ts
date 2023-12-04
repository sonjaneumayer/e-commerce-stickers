import { Request, Response } from 'express'

import { Item } from '../../models/model'

export const getItemsByCategory = async (req: Request, res: Response) => {
  const { category } = req.query
  try {
    // Find the user in the database by email
    const items = await Item.findOne({ category })
    if (!items) {
      return res
        .status(404)
        .json({ success: false, message: 'Category not found' })
    }
    res.status(201).json(items)
  } catch (error) {
    console.error('Error during authentication:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}
