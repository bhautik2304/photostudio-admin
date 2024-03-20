import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// components
import LoadingScreen from '../components/loading-screen';
//
import Login from '../pages/auth/LoginPage';
import { useAuthContext } from './useAuthContext';
import { apiRoutes } from '../constants';
import { login } from '../redux/slices/AuthSlice';
// import { PATH_AFTER_LOGIN } from 'src/config-global';
import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

const authStatus={
  inilized:'Inilized',
  authticated:'authticated',
  unAuthticated:'unAuthticated',
}

export default function AuthGuard({ children }) {

  const [state,setState]=useState(authStatus.inilized)

  const tokens = localStorage.getItem('accessToken')

  console.log(tokens);

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(()=>{
    if (tokens) {
      axios.post(apiRoutes.session, { token: tokens }).then(((e)=>{
        if (e.data.code === 200) {
          setState(authStatus.authticated)
          dispatch(login(e.data))
          // navigate(PATH_AUTH.login)
        } else {
          setState(authStatus.unAuthticated)
        }
      }))
    }else {
      navigate(PATH_AUTH.login)
    } 

  },[dispatch, tokens,navigate])

  if (state === authStatus.inilized) {
    return <LoadingScreen />
  }

  if (state === authStatus.unAuthticated) {
    return <Login />
  }

  return <> {children} </>;
}
