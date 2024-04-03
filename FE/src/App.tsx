

import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Register } from './assets/pages/Register'
import { Login } from './assets/pages/Login'
import { SearchPages } from './assets/pages/SearchPages'
import { Home } from './assets/pages/Home'
import { FollowPages } from './assets/pages/FollowPages'
import { DetailThreadPages } from './assets/pages/DetailThreadPages'
import { DetailUserLogin } from './assets/pages/DetailUserLogin'
import { EditUserPages } from './assets/pages/EditUserPages'


function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={ <Home/> }/>
      <Route path='/search' element={ <SearchPages/> }/>
      <Route path='/follow' element={ <FollowPages/> }/>
      <Route path='/thread/:id' element={ <DetailThreadPages/> }/>
      <Route path='/myprofile' element={ <DetailUserLogin/>} />
      <Route path='/edit/' element={<EditUserPages/>} />
      

      <Route path='/register' element={ <Register/> }/>
      <Route path='/login' element={ <Login/> }/>
    </Routes>
    </>
  )
}

export default App
