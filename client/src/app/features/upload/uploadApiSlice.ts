import { apiSlice } from '../../api/apiSlice'
import { uploadImage } from './uploadSlice'

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation<any, FormData>({
      query: (data) => {
        return {
          url: '/user/upload-profile-image',
          method: 'POST',
          body: data,
          formData: true,
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          //console.log('image data: ', data)
          dispatch(uploadImage(data))
        } catch (err) {
          console.log(err)
        }
      },
    }),
  }),
})

export const { useUploadMutation } = uploadApiSlice
