import { IItemResponse } from '../../api/types'
import { apiSlice } from "../../api/apiSlice";
import { setItems } from './itemSlice';

export const itmesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllItems: builder.query<IItemResponse[], void>({
            query: () => ({
                url: '/item/get-all-items',
                method: 'GET'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    //console.log("items from db ", data)
                    dispatch(setItems(data))
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        getItemById: builder.query<IItemResponse, string>({
            query: (id) => `/item/get-specific-item/${id}`,
        })
    }),
});

export const {
    useGetAllItemsQuery,
    useGetItemByIdQuery
} = itmesApiSlice