import { IItemResponse } from '../../api/types';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../store';

export type ItemState = {
    items: IItemResponse[]
}

export const itemSlice = createSlice({
    name: 'item',
    initialState: { items: [] } as ItemState,
    reducers: {
        setItems: (state, action: PayloadAction<IItemResponse[]>) => {
            state.items = action.payload
        }
    },
})

export default itemSlice.reducer

export const getItems = (state: RootState) => state.item.items

export const { setItems } = itemSlice.actions