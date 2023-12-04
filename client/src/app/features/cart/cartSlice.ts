import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartItem, IItemResponse } from '../../api/types'
import { RootState } from '../../store'

export type CartState = {
  cartItems: CartItem[]
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [] } as CartState,
  reducers: {
    addItemToCart: (
      state,
      action: PayloadAction<{
        addedItem: IItemResponse
        selectedAmount: number
      }>
    ) => {
      const { addedItem, selectedAmount } = action.payload
      // parse the string to a number
      const quantity: number = selectedAmount
      // we need to check if item is already in the cart
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === addedItem._id
      )
      //if item exists, add the selected amount
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity += quantity
      } else {
        state.cartItems.push({
          ...action.payload.addedItem,
          quantity: quantity,
        })
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      )
      if (itemIndex !== -1) {
        state.cartItems.splice(itemIndex,1)
      }
    },
    changeQuantityItemFromCart: (
      state,
      action: PayloadAction<{ addedItem: IItemResponse; amount: number }>
    ) => {
      const { addedItem, amount } = action.payload
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === addedItem._id
      )
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = amount
      } else {
        state.cartItems.push({ ...action.payload.addedItem, quantity: amount })
      }
    },
    clearCart: (state) => {
      state.cartItems = []
    }
  },
})

export const { addItemToCart, removeItemFromCart, changeQuantityItemFromCart, clearCart } =
  cartSlice.actions

export const getCartItems = (state: RootState) => state.cart.cartItems
// we loop trough all cart products and multiply the amount with price
export const getTotalPrice = (state: RootState) => {
  const totalPrice = state.cart.cartItems.reduce((acc, next) => {
    const itemPrice = parseFloat(next.itemPrice)
    const itemTotal = next.quantity * itemPrice
    return acc + itemTotal
  }, 0)
  return totalPrice.toFixed(2)
}

export const getTotalAmountOfItems = (state: RootState) => {
  const totalAmountOfItems = state.cart.cartItems.reduce((acc, next) => {
    return (acc += next.quantity)
  }, 0)
  return totalAmountOfItems
}

export default cartSlice.reducer
