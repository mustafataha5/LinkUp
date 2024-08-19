import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Home from './views/Home'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
<<<<<<< HEAD
import Test from './components/Test'
=======
import MainPage from './views/MainPage'
>>>>>>> master

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
<<<<<<< HEAD
    <Route path='/login' element={<Login />}/>
    <Route path='/test' element={<Test />}/>
=======
    <Route path='/success' element={<MainPage/>}/>
>>>>>>> master
</Routes>
    </>
  )
}

export default App
