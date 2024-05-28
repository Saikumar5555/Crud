// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Home from './Home'
// import CreateStudent from './CreateStudent'
// import UpdateStudent from './UpdateStudent'
// import EmployeeDetail from './EmployeeDetail';

// function App() {
// return (
//   <BrowserRouter>
//    <Routes>
//     <Route path='/' element={<Home/>}/>
//     <Route path='/Create' element={<CreateStudent/>}/>
//     <Route path='/update/:id' element={<UpdateStudent/>}/>
//     <Route path="/employee/:EmpID" component={EmployeeDetail} />
//    </Routes>
//   </BrowserRouter>
// )
// }

// export default App


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';
import EmployeeDetail from './EmployeeDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<CreateStudent />} />
        <Route path="/update/:id" element={<UpdateStudent />} />
        <Route path="/employee/:EmpID" element={<EmployeeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
