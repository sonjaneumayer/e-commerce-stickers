import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { IUser } from '../../api/types'

export type AuthState = {
  user: IUser | null
  token: string | null
  isAuthenticated: boolean
  loading?: boolean
}

//we expect to receive the token back after login
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  } as AuthState,
  reducers: {
    setCredentials: (state, action) => {
      const {data} = action.payload
      //console.log("Data from setCredentials authSlice", action.payload)
      state.user = data?.user
      state.token = data?.accessToken
      //console.log('USER AUTH SET!!', state.token)
    },
    logOut: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    signUp: (state, action) => {},
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
