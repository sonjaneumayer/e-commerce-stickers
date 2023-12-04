import { Request, Response } from 'express'
import { Order } from '../../models/model'

export const getAllOrdersFromUser = async (req: Request, res: Response) => {
  const userId = req.params.userId
  try {
    const allOrders = await Order.find({ userId: userId })
    if (!allOrders) {
      res.status(404).json({ success: false, message: 'Nothing found' })
    }
    res.status(201).json(allOrders)
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}