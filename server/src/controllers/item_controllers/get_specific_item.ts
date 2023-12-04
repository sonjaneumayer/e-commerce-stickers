import { Request, Response } from 'express'
import { Item } from '../../models/model'

export const getSpecificItem = async (req: Request, res: Response) => {
  // extract item id from url params and save to variable
  const itemId = req.params.itemId
  try {
    // find the item in db with id
    const item = await Item.findOne({ _id: itemId })
    console.log(item)

    // error handling
    // if no item is found, send error message
    if (!item) {
      return res.status(404).json({ success: false, message: 'Nothing found' })
    }
    // get the image path from the item
    const imagePath = item.imagePath
    // send error message if no image path is found
    if (!imagePath) {
      return res
        .status(404)
        .json({ success: false, message: 'Image not found' })
    }

    // send responses
    // save info from item in db
    const imageUrl = item.imagePath

    // send item info back to client
    res.status(200).json(item)

    // catch errors
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}
