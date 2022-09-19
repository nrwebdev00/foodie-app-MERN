import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { HiOutlineMenu } from 'react-icons/hi';
import { HiLogout } from 'react-icons/hi';

import { logout } from '../../actions/userActions';
import SearchBar from '../Forms/SearchBar';
import MenuModal from '../Modals/MenuModal';
import ModalsBtnsHeader from '../Modals/ModalsBtnsHeader';
import Logo from '../../Img/logo.svg';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menu, setMenu ] = useState(false);
  const [mediaMenu, setMediaMenu ] = useState(false);
  const [ loggedIn, setLoggedIn] = useState(false);

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  console.log(userInfo.role)

  const logoutUser =()=>{
    dispatch(logout())
    navigate('/login')
  }

  useEffect(() =>{
    if(userInfo){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
    const handleWindowResize = () =>{
      setWindowWidth(window.innerWidth)
      if(windowWidth < 768){
        setMenu(false);
      }
      if(windowWidth > 768){
        setMediaMenu(false);
      }

    }
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [userInfo, setLoggedIn])

  const CheckForSmallScreenSize = () =>{
    if(windowWidth < 768){
      return true;
    }else{
      return false
    }
  }

  return (
    <>
    <header className="header-main">
      <div className={`header-explore header-main-item ${CheckForSmallScreenSize() ? 'display-none': ''} `}>
        <HiOutlineMenu onClick={() => setMenu(!menu)} />
      </div>
      <div className={`header-explore-media header-main-item ${CheckForSmallScreenSize() ? '':'display-none'}`}>
        <HiOutlineMenu onClick={() => setMediaMenu(!mediaMenu) } />
      </div>
      <div className="header-logo header-main-item">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="header-search header-main-item">
        <SearchBar />
      </div>
      <div className="header-settings header-main-item">
        {loggedIn ? <ModalsBtnsHeader /> : '' }
      </div>
      <div className="header-user header-main-item | padding-right-4">
      {loggedIn ?
        <div className='header-user-wrapper'>
          <Link to='/profile'>Profile</Link>
          <HiLogout onClick={logoutUser} className='fs-700' />
        </div>
          :
        <div className='header-user-wrapper'>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </div>
      }
      </div>
    </header>
    <div className={`header-menu ${menu ? '': 'display-none'}`}>
      <MenuModal isModalOpen={menu} setModalStatus={setMenu}  />
    </div>
    <div className={`header-menu-media ${mediaMenu ? '':'display-none'} `}>
      media menu
    </div>
    </>
  )
}

export default Header