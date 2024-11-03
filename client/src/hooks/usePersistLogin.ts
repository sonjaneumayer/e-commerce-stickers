import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useRefreshMutation} from '../app/features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { logOut, setCredentials } from '../app/features/auth/authSlice';
import Cookies from 'js-cookie';

export const usePersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, { isLoading: isRefreshing }] =useRefreshMutation()

  useEffect(() => {
  const verifyLogin = async () => {
    const storedToken = Cookies.get('jwt'); // Retrieve token from cookies
console.log("storedToken",storedToken)
    if (storedToken) {
      dispatch(setCredentials({ accessToken: storedToken, user: null })); // Set token in Redux state
    } else {
      try {
        const { data } = await refresh().unwrap(); // Call refresh mutation
        const { accessToken, user } = data ?? { accessToken: '', user: null };
        Cookies.set('jwt', accessToken, { 
          expires: 7,
          secure: true,
          sameSite: 'Lax' 
        }); // Set token in cookie
     
        dispatch(setCredentials({ accessToken, user })); // Set in Redux

      } catch (err) {
        console.error('Failed to refresh token:', err);
        dispatch(logOut()); // Clear credentials on error
        navigate('/login');
      } 
      setIsLoading(false); // Stop loading once check is complete
    }
  };

    verifyLogin(); // Call on mount to persist login
  }, [refresh, navigate, dispatch]);

  return { isLoading: isLoading || isRefreshing };
};