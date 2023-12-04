import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../app/store'
import { useMemo } from 'react'

// if you want to grab a value from the state into your app
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// dispatch, when you want to change something in the app
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useUser = () => {
  const user = useAppSelector((state) => state.auth)
  //console.log("user from HOOK: ", user)
  //!! make sure your resulting value is either true or false, not undefined or [] or {}.
  //For example, you're passing the resulting value to something that expects a boolean and nothing else.
  //This is how you coerce to a boolean type.
  const loading = useAppSelector((state) => !!state.auth.loading)
  //we memorize it with tuple syntax
  //react useMemo Hook returns a memoized value.
  //Think of memoization as caching a value so that it does not need to be recalculated.
  //The useMemo Hook only runs when one of its dependencies update.This can improve performance.
  return useMemo(() => [user, loading] as const, [user, loading])
}
export const useUserDetails = () => {
  const user = useAppSelector((state) => state.userState)
  return useMemo(() => [user] as const, [user])
}
