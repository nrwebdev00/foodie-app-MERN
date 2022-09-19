import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { FiEdit, FiFacebook, FiTwitter, FiYoutube, FiTwitch, FiGlobe, FiInstagram } from 'react-icons/fi';
import { FaPinterest } from 'react-icons/fa'
import { VscLocation } from 'react-icons/vsc'

import { urlChecker, emailChecker } from '../utlis/regExpChecker.js';
import { getProfileInfo, updateProfileInfo } from '../actions/userActions.js'
import Header from '../Components/Header/Header'
import Message from '../Components/Message.js';

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
  const [ printerestUrl, setPrinterestUrl] = useState('');
  const [ instagramUrl, setInstagramUrl] = useState('');
  const [ websiteUrl, setWebsiteUrl] = useState('');
  const [ location, setLocation] = useState('');
  const [ email, setEmail ] = useState('');
  const [ edit, setEdit] = useState(false)
  const [ formError, setFormError] = useState(null)
  const [ updatesSuccessfully, setUpdateSuccessfully] = useState(null)

  const [isProfileSet, setIsProfileSet] = useState(false);

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userProfileInfo = useSelector((state) => state.userProfileInfo)
  const { loading, profile } = userProfileInfo

  const onSubmit = (e) =>{
    e.preventDefault()
    if(!email){
      setFormError('Must Have a Valid email Address')
      return
    }
    if(!emailChecker(email)){
      setFormError('Invalid Email Address')
      return
    }
    if(!urlChecker(facebookUrl)){
      setFormError('Not Valid URL - Must Start With http:// or https://')
      return
    }
    if(!urlChecker(twitterUrl)){
      setFormError('Not Valid URL - Must Start With http:// or https://')
      return
    }
    if(!urlChecker(twitchUrl)){
      setFormError('Not Valid URL - Must Start With http:// or https://')
      return
    }
    if(!urlChecker(youtubeUrl)){
      setFormError('Not Valid URL - Must Start With http:// or https://')
      return
    }
    if(!urlChecker(printerestUrl)){
      setFormError('Not Valid URL - Must Start With http:// or https://')
      return
    }
    if(!urlChecker(instagramUrl)){
      setFormError('Not Valid URL - Must Start With http:// or https://')
      return
    }
    setFormError(null)
    const profile ={
      facebookUrl,
      twitterUrl,
      twitchUrl,
      youtubeUrl,
      printerestUrl,
      instagramUrl,
      name,
      email,
      bio,
      location,
    }
    dispatch(updateProfileInfo(profile))
    setUpdateSuccessfully('Profile Updated Successfully')

  }


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
      setPrinterestUrl(profile.printerestUrl)
      setInstagramUrl(profile.instagramUrl)
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
      <form className="profile" onSubmit={onSubmit}>
        <div className="profile-container">
          {formError && <Message message={formError} variant='message-error' />}
          {updatesSuccessfully && <Message message={updatesSuccessfully} variant='message-accent' />}
          <div className="edit-bar">
            <div><FiEdit className='fs-700' onClick={(() => setEdit(!edit))} /></div>
          </div>
          <section className="profile-info">
            <img src={profileImage} alt="Profile Image" />
            <div className="profile-info-wrapper">
              <div>
                {edit ?
                  <div className="form-group-flex">
                    <label htmlFor="" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-input"
                      name='name'
                      value={name}
                      onChange={((e) => setName(e.target.value))}
                    />
                  </div>
                :
                  <h1>{name}</h1>
                }
              </div>
              <div>
                {edit ?
                  <div className="form-group-flex">
                    <label htmlFor="" className="form-label">Location:</label>
                    <input
                      type="text"
                      className="form-input"
                      name='location'
                      value={location}
                      onChange={((e) =>setLocation(e.target.value))}
                    />
                  </div>
                :
                  <h2 className='profile-location'><VscLocation className='margin-top-3'/>{location}</h2>
                }
              </div>
              <div>
                {edit ?
                    <div className="form-group-flex">
                    <label htmlFor="" className="form-label">Email:</label>
                    <input
                      type="email"
                      className={`form-input ${emailChecker(email) ? '' : 'form-input-error'}`}
                      name='email'
                      value={email}
                      onChange={((e) =>setEmail(e.target.value))}
                    />
                    {emailChecker(email) ? '' : <span className="fs-550">Not Valid Email</span> }
                  </div>
                :
                  ''
                }
              </div>
            </div>
          </section>
          <section className="profile-bio">
            <h2>Bio of {name}</h2>
            {edit ?
              <textarea
                name="bio"
                value={bio}
                onChange={((e) => setBio(e.target.value))}
              ></textarea> : <p>{bio}</p>}
          </section>
          <section className={`profile-link ${edit ? 'display-none': ''}`}>
            {facebookUrl ? <a href={facebookUrl}><FiFacebook className='fs-650' /></a> : ''}
            {twitterUrl ? <a href={twitterUrl}><FiTwitter className='fs-650' /></a> : '' }
            {youtubeUrl ? <a href={youtubeUrl}><FiYoutube className='fs-650' /></a> : ''}
            {twitchUrl ? <a href={twitchUrl}><FiTwitch className='fs-650' /></a> : ''}
            {printerestUrl ? <a href={printerestUrl}><FaPinterest className='fs-650' /></a> : ''}
            {instagramUrl ? <a href={instagramUrl}><FiInstagram className='fs-650' /></a> : ''}
            {websiteUrl ? <a href={websiteUrl}><FiGlobe className='fs-650' /></a> : ''}
          </section>
          { edit ?
            <section className="profile-edit-links">
              <div className="form-group-flex">
                <label htmlFor="" className="form-label"><FiFacebook /></label>
                <input
                  type="text"
                  className={`form-input ${urlChecker(facebookUrl) ? '' : 'form-input-error'}`}
                  name='facebookUrl'
                  value={facebookUrl}
                  onChange={((e) => setFacebookUrl(e.target.value))}
                />
                {urlChecker(facebookUrl) ? '' : <span className='fs-550'>Not Valid Link</span> }
              </div>
              <div className="form-group-flex">
                <label htmlFor="" className="form-label"><FiTwitter /></label>
                <input
                  type="text"
                  className={`form-input ${urlChecker(twitterUrl) ? '' : 'form-input-error'}`}
                  name='twitterUrl'
                  value={twitterUrl}
                  onChange={((e) => setTwitterUrl(e.target.value))}
                />
                {urlChecker(twitterUrl) ? '' : <span className='fs-550'>Not Valid Link</span>}
              </div>
              <div className="form-group-flex">
                <label htmlFor="" className="form-label"><FiYoutube /></label>
                <input
                  type="text"
                  className={`form-input ${urlChecker(youtubeUrl) ? '' : 'form-input-error'}`}
                  name='youtubeUrl'
                  value={youtubeUrl}
                  onChange={((e) => setYoutubeUrl(e.target.value))}
                />
                {urlChecker(youtubeUrl) ? '' : <span className="fs-550">Not Valid Link</span> }
              </div>
              <div className="form-group-flex">
                <label htmlFor="" className="form-label"><FiTwitch /></label>
                <input
                  type="text"
                  className={`form-input ${urlChecker(twitchUrl) ? '' : 'form-input-error'}`}
                  name='twitchUrl'
                  value={twitchUrl}
                  onChange={((e) => setTwitchUrl(e.target.value))}
                />
                {urlChecker(twitchUrl) ? '' : <span className="fs-550">Not Valid Link</span> }
              </div>
              <div className="form-group-flex">
                <label htmlFor="" className="form-label"><FaPinterest /></label>
                <input
                  type="text"
                  className={`form-input ${urlChecker(printerestUrl) ? '' : 'form-input-error'}`}
                  name='printerestUrl'
                  value={printerestUrl}
                  onChange={((e) => setPrinterestUrl(e.target.value))}
                />
                {urlChecker(printerestUrl) ? '' : <span className="fs-550">Not Valid Link</span> }
              </div>
              <div className="form-group-flex">
                <label htmlFor="" className="form-label"><FiInstagram /></label>
                <input
                  type="text"
                  className={`form-input ${urlChecker(instagramUrl) ? '' : 'form-input-error'}`}
                  name='instagram'
                  value={instagramUrl}
                  onChange={((e) => setInstagramUrl(e.target.value))}
                />
                {urlChecker(instagramUrl) ? '' : <span className="fs-550">Not Valid Link</span> }
              </div>
            </section>
          :
            ''
          }
          {edit ?
          <div className="form-group-btn">
            <input type="submit" value="Update Profile" className='btn submit-btn raise-up-hover-effect' />
          </div>
        : ''}
        </div>
      </form>
    </>
  )
}

export default Profile