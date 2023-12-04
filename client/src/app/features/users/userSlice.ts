import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { IUser } from '../../api/types'
export type UserState = {
  // need to fix this any type and replace it with IUser
  user: any | null
  loading?: boolean
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  } as UserState,
  reducers: {
    // login
    setUser: (state, action) => {
      state.user = action.payload.user
    },
    // log out
    unsetUser: (state) => {
      state.user = null
    },
    // set or update the users address
    updateUserAddress: (state, action) => {
      return {
        ...state,
        user: {
          address: action.payload,
        },
      }
    },
    // upload profile image
    updateProfileImage: (state, action) => {
      const { profileImagePath } = action.payload
      state.user.profileImage = profileImagePath
    },
  },
})

export const { setUser, updateUserAddress, unsetUser, updateProfileImage } =
  userSlice.actions

export const selectUser = (state: RootState) => {
  return state.userState.user
}

export default userSlice.reducer
