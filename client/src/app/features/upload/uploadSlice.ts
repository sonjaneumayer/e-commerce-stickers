import { createSlice } from '@reduxjs/toolkit'

export type UploadState = {
  email: string | null
  profileImage: File | null
  imagePath: string
}

export const uploadSlice = createSlice({
  name: 'upload',
  initialState: { email: null, profileImage: null, imagePath: "" } as UploadState,
  reducers: {
    uploadImage: (state, action) => {
      state.imagePath = action.payload
    }
  },
})

export const { uploadImage } = uploadSlice.actions

export default uploadSlice.reducer