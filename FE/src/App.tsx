

import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Register } from './assets/pages/Register'
import { Login } from './assets/pages/Login'
import { SearchPages } from './assets/pages/SearchPages'
import { Home } from './assets/pages/Home'
import { FollowPages } from './assets/pages/FollowPages'
import { DetailThreadPages } from './assets/pages/DetailThreadPages'


function App() {
  

  return (
    <>
    <Routes>
      {/* <Route path='/' element={ 
      //ini layouting 1 pages, utk semua page
      <Layout/> 

        }/>
      <Route path='/search' element={ <Layout>
        <Search/>
        </Layout>}/> */}
      {/* <Route path='/' element={ <Layout/> }>
        <Route index element={ <CardHome/> }/>
        <Route path='/search' element={ <Search/> }/>
        <Route path='/follows' element={ <Follows/>} />
      </Route> */}
      <Route path='/' element={ <Home/> }/>
      <Route path='/search' element={ <SearchPages/> }/>
      <Route path='/follow' element={ <FollowPages/> }/>
      <Route path='/thread/:id' element={ <DetailThreadPages/> }/>
      

      <Route path='/register' element={ <Register/> }/>
      <Route path='/login' element={ <Login/> }/>
    </Routes>
    </>
  )
}

export default App
