import { IUser } from '../../api/types'
import { FormSchemaType } from '../../../components/form/loginForm/LoginForm'
import { logOut, setCredentials } from './authSlice'
import { apiSlice } from '../../api/apiSlice'
import { unsetUser } from '../users/userSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUser, FormSchemaType>({
      query: (credentials: any) => ({
        url: '/user/authenticate-user',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/user/user-log-out',
        method: 'POST',
      }),
      //we verify that query has fullfilled
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          //console.log("logout data: ", data)
          //sets token to null in local state
          dispatch(logOut())
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
        } catch (err) {
          console.log(err)
        }
      },
    }),
    refresh: builder.mutation<any, void>({
      query: () => ({
        url: '/user/refresh-token',
        method: 'GET',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken, user } = data  ?? { accessToken: '', user: null };
          //console.log("accessToken from refresh endpoint ", data)
          dispatch(setCredentials({ accessToken, user }))
        } catch (err) {
          console.log(err)
        }
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/user/create-user',
        method: 'POST',
        body: { ...userData },
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useRegisterMutation,
} = authApiSlice
