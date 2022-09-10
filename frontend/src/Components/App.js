import {  BrowserRouter, Routes, Route } from 'react-router-dom'

// Import Sass
import '../Scss/Main.scss'

// Import Pages
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import Profile from '../Pages/Profile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='register/' element={<Register />} />
        <Route path='login/' element={<Login />} />
        <Route path='profile/' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
