import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Home from './views/Home'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Test from './components/Test'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/test' element={<Test />}/>
</Routes>
    </>
  )
}

export default App
