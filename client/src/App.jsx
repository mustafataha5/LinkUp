import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Home from './views/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Test from './components/Test'
import Ads from './components/Ads';
import MainPage from './views/MainPage'
import Page403 from './components/Page403'
import FriendPage from './views/FriendPage'
import MessagePage from './views/MessagePage'
import { UserContext } from './context/UserContext'
import Profile from './views/Profile'
import axios from 'axios'
import AdminStat from './components/AdminStat'

function App() {
  const [user,setUser] = useState(null) ;
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  //console.log(">>>>>>>>>>" + user)
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
    },[])
   

  return (
    <>
     <UserContext.Provider value={ {user, setUser} }>
      <Routes>
      <Route path='/profile/:id' element={<Profile/>}/>
      <Route path='/muath' element={<AdminStat/>}/>
      {/* <Route path='/randatest' element={<AutoPlaySwipeableViews />} /> */}
        <Route path='/randatest' element={<Ads />} />
        {/* <Route path='/randatest' element={<AutoPlaySwipeableViews />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register flag={true} />} />
      { user && <Route
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
                            />}/>}  
        <Route path='/login' element={<Login />} />
        <Route path='/test' element={<Test />} />
        <Route path='/people' element={<FriendPage />} />
        <Route path='/message' element={<MessagePage/>} />
        <Route path='/success' element={<MainPage />} />
        <Route path='/403' element={<Page403 />} />
      </Routes>
     </UserContext.Provider>
    </>
  )
}
export default App
