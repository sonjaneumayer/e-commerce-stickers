import { Request, Response } from 'express'

import { Item } from '../../models/model'

export const getAllItemsFromDb = async (req: Request, res: Response) => {
  try {
    const allItems = await Item.find()
    if (!allItems) {
      res.status(404).json({ success: false, message: 'Nothing found' })
    }
    res.status(201).json(allItems)
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}
