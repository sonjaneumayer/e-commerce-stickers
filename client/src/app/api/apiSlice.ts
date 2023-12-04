import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../features/auth/authSlice'
import { RootState } from '../store'

// development
const BASE_URL: string = import.meta.env.VITE_BASE_URL

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // to send back the http only secure cookie with every query
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})
// maybe needed for User details
//const selectAuthUser = (state: RootState) => state.auth.user;

// wrapper for base query
const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions)
  //console.log("RESULT", result.error)

  // If you want, handle other status codes, too
  //backend sends 403 if access token is expired
  if (result?.error?.status === 403) {
    console.log('sending refresh token')

    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    console.log('refreshResult', refreshResult)

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }))

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data = 'Your login has expired. '
      }
      return refreshResult
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  // tags are just a name that you can give to a specific collection of data to control caching and invalidation behavior for re-fetching purposes. It can be considered as a 'label' attached to cached data that is read after a mutation, to decide whether the data should be affected by the mutation.
  //tagTypes: ['User'],
  endpoints: (builder) => ({}),
})
