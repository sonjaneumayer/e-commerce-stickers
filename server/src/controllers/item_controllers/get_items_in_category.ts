import { Response } from 'express'
import { Item } from '../../models/model'

////// GET ITEMS BY CATEGORY
export const getItemsInCategory = async (
  res: Response,
  itemCategory: string
) => {
  try {
    // find all items matching the category
    const items = await Item.find({ itemCategory: itemCategory })
      .sort({ date: -1 })
      .limit(10)
    // if no items were found, send back error message
    if (!items) {
      return res
        .status(404)
        .json({ success: false, message: 'No items found in this category' })
    }
    // send back the items that were found
    res.status(201).json(items)
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}
