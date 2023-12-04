import { createSlice } from '@reduxjs/toolkit'
import { IOrderResponse } from '../../api/types'
import { RootState } from '../../store'

export type OrdersState = {
    orders: IOrderResponse[]
}

export const placeOrderSlice = createSlice({
    name: 'placeOrder',
    initialState: { orders: [] } as OrdersState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload
        },

    },
})

export const { setOrders } = placeOrderSlice.actions

export const selectOrders = (state: RootState) => {
    return state.placeOrder.orders
  }

export default placeOrderSlice.reducer
