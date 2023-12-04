# item api docs

## get requests

## Get Reduced Items

Returns all items where reduced === true

## Get Items in Category

Retrieve a list of items based on their category.

#### GET `/item/get-items-in-category/:itemCategory`

### Parameters

- `itemCategory` (string, required): The category of items to retrieve.

### Response

#### GET `/item/reduced`

- request body:

```

{ "reduced": "true" }

```

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

### Get specific item

Get a specific item, the item will be found with the item id

### GET `/item/get-specific-item/:itemId`

- request body:

  ```
  {
    "_id": "65168e24bc0132f"
  }
  ```

- response body:
  ```
  {
      "_id": "item_id_1",
      "itemName": "Item 1",
      "itemCategory": "Category A",
      "date": "2023-09-21T12:00:00Z"
    }
  ```

## Check Inventory

Verify that the items in the users shopping cart are available in the inventory when they proceed to checkout

### POST `/item/verify-checkout`

- request body:

  ```
  { // user id
    "_id": "65168e24bc0132f",
    // array of items
    "shoppingCart":
  shoppingCart: [{},{}]
  }
  ```

## Complete Order

Move the users shopping cart to orders once the order is completed and paid for

### POST `/item/move-cart-to-orders`

- request body:

  ```
  {
    "_id": "65168e24bc0132f",
  }
  ```
