import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_PROFILE_INFO_FAIL,
  USER_PROFILE_INFO_REQUEST,
  USER_PROFILE_INFO_SUCCESS,
  USER_PROFILE_INFO_RESET,

} from '../constants/userConstants.js';


export const login = (userName, password) => async(dispatch)=>{
  try{
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers:{
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { userName, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch(error){
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}

export const register = (name, userName, email, password) => async(dispatch)=>{
  try{
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers:{
        'Content-Type':'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/register',
      {name, userName, email, password},
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

  }catch(error){
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const logout = () =>(dispatch)=>{
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT})
  dispatch({ type: USER_PROFILE_INFO_RESET})

}

export const getProfileInfo = () => async(dispatch, getState) =>{
  try {
    dispatch({
      type: USER_PROFILE_INFO_REQUEST,
    })

    const { userLogin: { userInfo}, } = getState()

    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }
    }

    const { data } = await axios.get(
      '/api/users/profile',
      config
    )

    dispatch({
      type: USER_PROFILE_INFO_SUCCESS,
      payload: data
    })

  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    if(message === 'Not authorized, token failed'){
      dispatch(logout())
    }
    dispatch({
      type: USER_PROFILE_INFO_FAIL,
      payload: message
    })
  }
}