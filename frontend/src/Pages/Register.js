import React, {  useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { register } from '../actions/userActions';
import logo from '../Img/logo.svg'
import Message from '../Components/Message';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] =useState('');
  const [userName, setUserName] =useState('');
  const [email, setEmail ] = useState('');
  const [confirmEmail, setConfirmEmail] =useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() =>{
    if(userInfo){
      navigate('/')
    }
  },[userInfo, navigate])

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(name.length < 2){
      setFormError('Name Must be at least 3 Characters Long.')
      return
    }
    if(!userName){
      setFormError('Please Enter a User Name.')
      return
    }
    if(!email){
      setFormError('Please enter an Email address.')
      return
    }
    if(email != confirmEmail ){
      setFormError('Email and Confirm Email do not match.')
      return
    }
    if(!confirmEmail){
      setFormError('Please Confirm Email Address.')
      return
    }
    if(!password){
      setFormError('Please Enter a Password')
    }
    if(password != confirmPassword){
      setFormError('Password and Confirm Password do not match.')
      return
    }
    if(!confirmPassword){
      setFormError('Please Confirm Password.')
      return
    }
    setFormError('')
    dispatch(register(name, userName, email, password));

  }


  return (
    <div className="form-container">
      <div className="register margin-bottom-10">
        {formError && <Message message={formError} variant="message-error" />}
        <div className="register-title">
          <img src={logo} alt="Logo Foodie App" />
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              className='form-input fs-700'
              name="name"
              value={name}
              aria-label='Name'
              onChange={((e) => setName(e.target.value))}
              placeholder="Enter Name..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="userName" className="form-label">User Name:</label>
            <input
              type="text"
              className='form-input fs-700'
              name='userName'
              value={userName}
              aria-label="Register user Name"
              onChange={((e) => setUserName(e.target.value))}
              placeholder="Enter User Name..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-input fs-700"
              name='email'
              value={email}
              aria-label="User Email"
              onChange={((e) => setEmail(e.target.value))}
              placeholder="Enter Email Address..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmEmail" className="form-label">Confirm Email:</label>
            <input
              type="email"
              className='form-input fs-700'
              name='confirmEmail'
              value={confirmEmail}
              aria-label='Confirm Email'
              onChange={((e) => setConfirmEmail(e.target.value))}
              placeholder="Confirm Email Address..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className='form-label'>Password:</label>
            <input
              type="password"
              className="form-input fs-700"
              name='password'
              value={password}
              aria-label='Password'
              onChange={((e) => setPassword(e.target.value))}
              placeholder="Enter Password..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="ConfirmPassword" className="form-label">Confirm Password:</label>
            <input
              type="password"
              className="form-input fs-700"
              name='confirmPassword'
              value={confirmPassword}
              aria-label='Confirm Password'
              onChange={((e) => setConfirmPassword(e.target.value))}
              placeholder="Confirm Password..."
            />
          </div>
          <div className="form-group-btn">
            <input type="submit" value='Register' className="btn submit-btn raise-up-hover-effect" />
          </div>
          <div className="form-group-links">
            <Link to='/login' className='fs-650'>To login With the Foodie App Click Here.</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register