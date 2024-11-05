# STICKERS

## Overview

Stickers E-Commerce Platform is an online store dedicated to the sale and purchase of a wide variety of stickers. Whether you're a sticker enthusiast, collector, or someone looking to add a personal touch to your belongings, our platform provides a diverse range of stickers to suit every taste.

## Features

- **User Authentication**: Secure user authentication system for account creation and login.
- **Browse Stickers**: Explore a vast collection of stickers.
- **Shopping Cart**: Add stickers to your cart for a seamless checkout experience.
- **Secure Checkout**: Process payments securely through integrated payment gateways.
- **Order History**: Track your purchase history and view order details.
- **Contact**: Send an email for enquiries about orders through the contact form.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sunnyeyles/STICKERS
cd stickers-ecommerce
```

### 2. Start Devlopment Environment

```bash
docker compose up
```

## Technologies

#### Frontend

- React
- TypeScript
- Redux Toolkit
- Vite
- Mantine UI

#### Backend

- Node.js
- Express
- MongoDB
- Mongoose

### stripe payment in local dev environment

To test and manage your Stripe integration from command line, install the Stripe CLI: 'https://stripe.com/docs/stripe-cli' and create an account

Than login and authenticate your Stripe user Account

- first you need to cd into the folder where you have stored stripe.exe
- `stripe login` to connect with stripe in cmd

And test your webhook endpoint function
To forward events to your local endpoint, run the following command with the the CLI to set up a local listener

- `stripe listen --forward-to localhost:3000/payment/stripe/webhook` to call the local test endpoint
- `4242 4242 4242 4242` dummy credit card number
