import express, { Express, Request, Response } from "express";
import Stripe from "stripe"
import dotenv from 'dotenv'
import { Order } from '../../models/model';
import { create } from "domain";

const stripeKey = new Stripe(process.env.STRIPE_KEY)
dotenv.config()

// STRIPE WEBHOOK to complete payment

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret = process.env.STRIPE_CLI_WEBHOOK_SECRET as string

export const triggerStripeWebhook = async (req: Request, res: Response) => {
    // checking if the event that causes this webhook comes from stripe
    // const sig = req.headers['stripe-signature']
console.log("1")
    const payload = req.body;
    const payloadString = JSON.stringify(payload, null, 2);
    const header = stripeKey.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret
    })

    let data
    let eventType: string
    let event: Stripe.Event

    try {
        event = stripeKey.webhooks.constructEvent(payloadString, header, endpointSecret)
        console.log("Webhook verified")
    } catch (err) {
        console.log(`Webhook Error:${err.message}`)
        res.status(400).send(`Webhook Error: ${err.message}`)
        return;
    }

    data = event.data.object
    eventType = event.type

    // Handle the event
    if (eventType === "checkout.session.completed") {
        stripeKey.customers
            .retrieve(data.customer)
            .then((customer) => {
                // console.log("customer", customer)
                // console.log("data", data)
                createOrder(customer, data)
            }).catch(err => console.log("ERROR", err.message))
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send().end()
}

// CREATE ORDER
const createOrder = async (customer, data) => {
    const items = JSON.parse(customer.metadata.cart)
    const newOrder = new Order({
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        products: items,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        paymentStatus: data.payment_status
    })
    console.log("newOrder: ",newOrder)
    try {
        const savedOrder = await Order.create(newOrder)
        //console.log("Processed order", savedOrder)
        //Optional TODO: send email to the user with order details
    } catch (error) {
        console.log(error)
    }
}