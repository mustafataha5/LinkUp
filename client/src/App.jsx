import { useEffect, useState } from 'react';
import Home from './views/Home'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Test from './components/Test';
import MainPage from './views/MainPage';
import Page403 from './components/Page403';
import Page401 from './components/Page401';
import Page404 from './components/Page404';
import FriendPage from './views/FriendPage';
import MessagePage from './views/MessagePage';
import { UserContext } from './context/UserContext';
import Profile from './views/Profile';
import axios from 'axios';
import AdminUserList from './views/AdminUserList';
import AdminDashboard from './views/AdminDashboard';
import AboutUsPage from './views/AboutUs';
import ServicesPage from './views/Serveces';
import ContactUsForm from './components/ContactUsForm';
import ContactResponse from './components/ContactResponse';




function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [acknowledgmentMessage, setAcknowledgmentMessage] = useState('');

  useEffect(() => {

    axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
      .then(async response => {
        console.log(response.data.user.password)
        setUser(response.data.user);
        setLoading(false)
      })
      .catch(error => {
        console.error('Error checking authentication', error);
        //navigate("/403")
      })
  }, [])

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/contact" element={<ContactUsForm setAcknowledgmentMessage={setAcknowledgmentMessage} />} />
          <Route path="/contact/response" element={<ContactResponse acknowledgmentMessage={acknowledgmentMessage} />} />
    
          <Route path='/services' element={<ServicesPage/>}/>
          <Route path='/about' element={<AboutUsPage/>}/>

          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/users' element={<AdminUserList />} />
          {/* <Route path='/randatest' element={<Ads />} /> */}

          {/* Profile displays BACKEND api */}
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register flag={true} />} />
          {user && <Route
            path={"/register/" + user._id}
            element={
              <Register
                flag={false}
                intialFirst={user.firstName}
                intialLast={user.lastName}
                initialEmail={user.email}
                intialPassword={user.password}
                intialConfirm={user.password}
                intialBirthday={user.birthday}
                intialGender={user.gender}
              />} />}
          <Route path='/login' element={<Login />} />
          <Route path='/test' element={<Test />} />
          <Route path='/people' element={<FriendPage />} />
          <Route path='/message' element={<MessagePage />} />
          <Route path='/success' element={<MainPage />} />
          <Route path='/403' element={<Page403 />} />
          <Route path='/401' element={<Page401 />} />
          {/* Catch all unmatched routes */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App