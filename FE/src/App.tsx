

import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Register } from './feature/auth/component/Register'
import { Login } from './feature/auth/component/Login'
import { SearchPages } from './pages/SearchPages'
import { Home } from './pages/Home'
import { FollowPages } from './pages/FollowPages'
import { DetailThreadPages } from './pages/DetailThreadPages'
import { DetailUserLogin } from './pages/DetailUserLogin'
import { EditUserPages } from './pages/EditUserPages'
// import { FirstLook } from './layout/component/FristLook'


function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={ <Home/>} />
      {/* <Route path='/home' element={ <Home/> }/> */}
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
