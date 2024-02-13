

import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './assets/pages/Home'
import { Register } from './assets/pages/Register'
import { Login } from './assets/pages/Login'


function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={ <Home/> }/>
      <Route path='/register' element={ <Register/> }/>
      <Route path='/login' element={ <Login/> }/>

      
    </Routes>
    </>
  )
}

export default App
