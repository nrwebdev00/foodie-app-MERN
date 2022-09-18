import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Message from '../Components/Message.js';
import { login } from '../actions/userActions.js';
import logo from '../Img/logo.svg';

function Login() {

const navigate = useNavigate()

const [userName, setUserName ] = useState('');
const [password, setPassword ] = useState('');

const dispatch = useDispatch();

const userLogin = useSelector((state) => state.userLogin)
const { loading, error, userInfo } = userLogin


useEffect(() =>{
  if(userInfo){
    navigate('/')
  }
},[userInfo, navigate])


const handleSubmit=(e)=>{
  e.preventDefault()
  dispatch(login(userName, password))
}

  return (
    <div className="form-container">
      <div className="login">
        {error && <Message message={error} variant="message-error" />}
        <div className="login-title">
          <img src={logo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="userName" className='form-label'>User Name:</label>
            <input
              type="text"
              className='form-input fs-700'
              value={userName}
              name='userName'
              onChange={((e) => setUserName(e.target.value))}
              aria-label='User Name'
              placeholder="Enter User Name..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className='form-label'>Password:</label>
            <input
              type="password"
              className='form-input fs-700'
              value={password}
              name='password'
              onChange={((e) => setPassword(e.target.value))}
              aria-label='User Password'
              placeholder="Enter Password..."
            />
          </div>
          <div className="form-group-btn">
            <input type="submit" value="Login" className='btn submit-btn raise-up-hover-effect' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login