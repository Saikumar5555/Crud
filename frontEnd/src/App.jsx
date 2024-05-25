import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import CreateStudent from './CreateStudent'
import UpdateStudent from './UpdateStudent'

function App() {
return (
  <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Create' element={<CreateStudent/>}/>
    <Route path='/update/:id' element={<UpdateStudent/>}/>
   </Routes>
  </BrowserRouter>
)
}

export default App
