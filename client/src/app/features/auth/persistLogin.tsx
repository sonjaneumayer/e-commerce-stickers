import { Outlet, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { usePersistentState } from '../../../hooks/usePersistentState'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
import { useRefreshMutation } from './authApiSlice'


export const PersistLogin = () => {
  const [persist] = usePersistentState()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef<boolean>(true)

  const [trueSuccess, setTrueSuccess] = useState(false)

  // const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
  //   useRefreshMutation()

    const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode only works in development

      const verifyRefreshToken = async () => {
        //console.log('verifying refresh token')
        try {
          await refresh()
          //we got data and Credentials got set
          setTrueSuccess(true)
        } catch (err) {
          console.error(err)
        }
      }
      if (!token && persist) verifyRefreshToken()
    }

    effectRan.current = true

    // eslint-disable-next-line
  }, [])

  let content: JSX.Element = <></>
  if (!persist) {
    // persist: no
    //console.log('no persist')
    content = <Outlet />
  } else if (isLoading) {
    //persist: yes, token: no
    //console.log('loading')
    content = <p>Loading...</p>
  } else if (isError) {
    //persist: yes, token: no
    //console.log('error')
    content = (
      <p className="errmsg">
        {/* {error.data?.message} */}
        <Link to="/login">Please login again</Link>.
      </p>
    )
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    //console.log('success')
    content = <Outlet />
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    //console.log('token and uninit')
    //console.log(isUninitialized)
    content = <Outlet />
  }

  return content
}
