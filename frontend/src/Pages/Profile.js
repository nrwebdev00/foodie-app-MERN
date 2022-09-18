import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { FiEdit } from 'react-icons/fi';
import { getProfileInfo } from '../actions/userActions.js'
import Header from '../Components/Header/Header'

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [ youtubeUrl, setYoutubeUrl] = useState('');
  const [ twitchUrl, setTwitchUrl] = useState('');
  const [ websiteUrl, setWebsiteUrl] = useState('');
  const [ location, setLocation] = useState('');
  const [ email, setEmail ] = useState('');
  const [ edit, setEdit] = useState(false)

  const [isProfileSet, setIsProfileSet] = useState(false);

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userProfileInfo = useSelector((state) => state.userProfileInfo)
  const { loading, profile } = userProfileInfo



  useEffect(() =>{
    if(!isProfileSet){
      dispatch(getProfileInfo())
      setIsProfileSet(true)
    }else{
      setName(profile.name)
      setBio(profile.bio)
      setProfileImage(profile.profileImage)
      setFacebookUrl(profile.facebookUrl)
      setTwitterUrl(profile.twitterUrl)
      setYoutubeUrl(profile.youtubeUrl)
      setTwitchUrl(profile.twitchUrl)
      setWebsiteUrl(profile.websiteUrl)
      setLocation(profile.location)
      setEmail(profile.email)
    }
    if(!userInfo){
      navigate('/login')
    }


  },[userInfo, navigate, profile, dispatch, getProfileInfo, setName, setBio, setProfileImage, setFacebookUrl, setTwitterUrl, setYoutubeUrl, setTwitchUrl, setWebsiteUrl, setLocation, setEmail])

  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile-container">
          <div className="edit-bar">
            <div><FiEdit className='fs-700' onClick={(() => setEdit(!edit))} /></div>
          </div>
          <div className="profile-top">
            <div className="profile-image">
              <img src={profileImage} alt="Profile Image" />
            </div>
            <div className="profile-info">
              <div className="form-group">
                <label htmlFor="name" className='form-label'>Chef:</label>
                <input
                  type="text"
                  className='form-input'
                  disabled={edit}
                  placeholder={name}
                  value={name}
                  onChange={((e) => setName(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location" className='form-label'>Location:</label>
                <input
                  type='text'
                  className='form-input'
                  disabled={edit}
                  placeholder={location}
                  value={location}
                  onChange={((e) => setLocation(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className='form-label'>Email:</label>
                <input
                  type='email'
                  className='form-input'
                  disabled={edit}
                  placeholder={email}
                  value={email}
                  onChange={((e) => setEmail(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="profile-middle">
            <textarea
              name="bio"
              disabled={edit}
            >
              {bio}
            </textarea>
          </div>
          <div className="profile-bottom">bottom</div>
        </div>
      </div>
    </>
  )
}

export default Profile