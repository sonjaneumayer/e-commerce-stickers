# payment api docs

## get requests

### Get Orders

Returns all orders from a user

#### GET `/payment/get-orders-by-user-id/:userId`

### Parameters

- `userId` (string, required): The id of the user.

### Response

- response body:

  ```
  [
    {
      "_id": "item_id_1",
      "itemName": "Item 1",
      "itemCategory": "Category A",
      "date": "2023-09-21T12:00:00Z"
    },
    {
      "_id": "item_id_2",
      "itemName": "Item 2",
      "itemCategory": "Category A",
      "date": "2023-09-20T10:30:00Z"
    }
  ]
  ```


## post requests


### Creates Stripe Credit Card Checkout Session

#### POST `/payment/stripe/webhook`

### Parameters

- `userId` (string, required): The id of the user.
- `shoppingCart` ([], required): The cart Items of the checkout.

A stripe customer and the items for the checkout session get created. 

- request body:

```
will be automatically set by stripe
```



### Create New Order

#### POST `/payment/create-checkout-session`

Checks if the event that causes this webhook comes from stripe. Then handles the event 'checkout.session.completed'. Creates a new order from the stripe webhook data.

- request body:

```
{
  "userId": "10324343870",
  "shoppingCart": [
    {
       'itemName': 'Incredible Steel Keyboard',
       'itemPrice': '153.00',
       'itemDescription': 'Sees bird in air, breaks into cage and attacks creature.',
       'imagePath': 'http://localhost:3000/uploads/three-froggos.png',
       'itemCategory': 'Music',
       'numOfItems': 1,
       'reduced': true,
       'percentageReduced': 53,
       '_id': "654e1602192458beaa89e95f",
       'createdAt': 2023-11-10T11:37:38.272Z,
       'updatedAt': 2023-11-10T11:37:38.272Z,
    },
    {
        ...
    },
    ...
  ]
}
```
