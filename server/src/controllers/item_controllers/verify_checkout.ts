import { Request, Response } from 'express'
import { User, Item } from '../../models/model'

interface IItem {
  _id: string
  numOfItems: number
}
// VERIFY ITEMS ARE AVAILABLE
export const verifyCheckout = async (req: Request, res: Response) => {
  const { userId, shoppingCart } = req.body
  try {
    // make sure user exists
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' })
    }

    user.shoppingCart = shoppingCart
    // make sure there is enough items in inventory to fulfill order
    const findOutOfStock: () => Promise<object[]> = async () => {
      // this will return an array of all missing items in db(if any)
      const outOfStockItems = await Promise.all(
        user.shoppingCart.map(async (item: IItem) => {
          console.log("ITEM", item)
          const foundItem = await Item.findById(item._id)
          // log results to console
          console.log(`${foundItem.numOfItems} items in stock`)
          console.log(`${item.numOfItems} items bought`)
          if (foundItem.numOfItems < item.numOfItems) {
            return foundItem
          }
          return null
        })
      )
      return outOfStockItems.filter((item) => item !== null)
    }
    const outOfStockItems = await findOutOfStock()
    console.log(`Out of stock items: ${outOfStockItems}`)
    // send error if there is not enough items in inventory
    if (outOfStockItems.length > 0) {
      res.status(500).json({
        success: false,
        message: 'There are not enough items in inventory to fulfill the order',
      })
    }
    // if all items are in stock, update users shopping cart in db
    await user.save()
    res
      .status(200)
      .json({ success: true, message: 'Shopping cart updated successfully' })
  } catch (error) {
    console.error('Error during shopping cart update:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}

// UPDATE USERS SHOPPINGCART IN DB
// updates users shoppingCart without checking if items are available(testing purposes only)
export const updateUsersshoppingCartInDb = async (
  req: Request,
  res: Response
) => {
  const { _id, shoppingCart } = req.body
  try {
    const user = await User.findById(_id)

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    user.shoppingCart = shoppingCart

    // update user with their shopping cart
    await user.save()
    res
      .status(200)
      .json({ success: true, message: 'Shopping cart updated successfully' })
  } catch (error) {
    console.error('Error during shopping cart update:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}
