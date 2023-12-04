import { IOrderItem } from '../../models/model_types';
import express, { Express, Request, Response } from "express";
import Stripe from "stripe"
import dotenv from 'dotenv'
import { envConfig } from '../../config/env_config'

const stripeKey = new Stripe(process.env.STRIPE_KEY)
dotenv.config()

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { userId, shoppingCart } = req.body

  const cart: IOrderItem[] = shoppingCart.map(
    item => ({
      itemId: item._id,
      itemName: item.itemName,
      imagePath: item.imagePath,
      itemPrice: item.itemPrice,
      quantity: item.quantity
    })
  )

  let customer
  try {
    customer = await stripeKey.customers.create({
      metadata: {
        userId: userId.toString(),
        cart: JSON.stringify(cart),
      }
    })
    console.log('Customer created:', customer);
  } catch (error) {
    console.error('Error creating customer:', error);
  }


  const lineItems = cart.map((item: IOrderItem) => {
    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.itemName,
          metadata: {
            id: item.itemId
          }
        },
        unit_amount: (parseFloat(item.itemPrice)) * 100,
      },
      quantity: item.quantity,
    }
  })

  const session = await stripeKey.checkout.sessions.create({
    // shipping_address_collection: {
    //   allowed_countries: ['US', 'CA', 'DE'],
    // },
    // shipping_options: [
    //   {
    //     shipping_rate_data: {
    //       type: 'fixed_amount',
    //       fixed_amount: {
    //         amount: 0,
    //         currency: 'eur',
    //       },
    //       display_name: 'Free shipping',
    //       delivery_estimate: {
    //         minimum: {
    //           unit: 'business_day',
    //           value: 5,
    //         },
    //         maximum: {
    //           unit: 'business_day',
    //           value: 7,
    //         },
    //       },
    //     },
    //   },
    //   {
    //     shipping_rate_data: {
    //       type: 'fixed_amount',
    //       fixed_amount: {
    //         amount: 1500,
    //         currency: 'eur',
    //       },
    //       display_name: 'Next day air',
    //       delivery_estimate: {
    //         minimum: {
    //           unit: 'business_day',
    //           value: 1,
    //         },
    //         maximum: {
    //           unit: 'business_day',
    //           value: 1,
    //         },
    //       },
    //     },
    //   },
    // ],
    // phone_number_collection: {
    //   enabled: true
    // },
    line_items: lineItems,
    customer: customer.id,
    // "customer_details": {
    //   "address": {
    //     "city": null,
    //     "country": "DE",
    //     "line1": null,
    //     "line2": null,
    //     "postal_code": null,
    //     "state": null
    //   },
    mode: 'payment',
    //if payment is successful, where should the payment checkout takes us to
    success_url: `${envConfig.clientUrl}/confirmation`,
    cancel_url: `${envConfig.clientUrl}/cart`,
  })
  res.send({ url: session.url })
}

