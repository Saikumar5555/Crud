// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Home() {
//   const [employees, setEmployees] = useState([]);
//   const [filterDept, setFilterDept] = useState('');
//   const [filteredDeptName, setFilteredDeptName] = useState('');

//   const handleFilterChange = (event) => {
//     setFilterDept(event.target.value);
//     setFilteredDeptName('');
//   };

//   useEffect(() => {
//     let url = 'http://localhost:3000/';
//     if (filterDept) {
//       url += `?dept=${filterDept}`;
//       setFilteredDeptName(filterDept);
//     }
//     axios.get(url)
//       .then(res => setEmployees(res.data))
//       .catch(err => console.log(err));
//   }, [filterDept]);

//   const handleDelete = async (EmpID) => {
//     try {
//       await axios.delete(`http://localhost:3000/employee/${EmpID}`);
//       setEmployees(employees.filter(employee => employee.EmpID !== EmpID));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
//       <div className='w-50 bg-white rounded p-3'>
//         <div className="d-flex justify-content-end mb-3">
//           <Link to='/create' className='btn btn-success'>Add+</Link>
//         </div>
//         <table className='table'>
//           <thead>
//             <tr>
//               <th>EmpID</th>
//               <th>EmpName</th>
//               <th>EmpAge</th>
//               <th>
//                 <div className="d-flex align-items-center">
//                   <span>EmpDept</span>
//                   <input
//                     type="text"
//                     id="deptFilter"
//                     className="form-control ms-2"
//                     value={filterDept}
//                     onChange={handleFilterChange}
//                     placeholder="Filter"
//                     style={{ width: '100px' }}
//                   />
//                 </div>
//               </th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees
//               .filter(employee =>
//                 !filterDept || employee.EmpDept.toLowerCase().includes(filterDept.toLowerCase())
//               )
//               .map((employee, i) => (
//                 <tr key={i}>
//                   <td>{employee.EmpID}</td>
//                   <td>
//                     <Link to={`/employee/${employee.EmpID}`} className='text-decoration-none'>
//                       {employee.EmpName}
//                     </Link>
//                   </td>
//                   <td>{employee.EmpAge}</td>
//                   <td>{employee.EmpDept}</td>
//                   <td>
//                     <Link to={`update/${employee.EmpID}`} className='btn btn-primary'>Update</Link>
//                     <button onClick={() => handleDelete(employee.EmpID)} className='btn btn-danger ms-2'>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Home;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [employees, setEmployees] = useState([]);
  const [filterDept, setFilterDept] = useState('');
  const [filteredDeptName, setFilteredDeptName] = useState('');

  const handleFilterChange = (event) => {
    setFilterDept(event.target.value);
    setFilteredDeptName('');
  };

  useEffect(() => {
    let url = 'http://localhost:3000/';
    if (filterDept) {
      url += `?dept=${filterDept}`;
      setFilteredDeptName(filterDept);
    }
    axios.get(url)
      .then(res => setEmployees(res.data))
      .catch(err => console.log(err));
  }, [filterDept]);

  const handleDelete = async (EmpID) => {
    try {
      await axios.delete(`http://localhost:3000/employee/${EmpID}`);
      setEmployees(employees.filter(employee => employee.EmpID !== EmpID));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <div className="d-flex justify-content-end mb-3">
          <Link to='/Create' className='btn btn-success'>Add+</Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>EmpID</th>
              <th>EmpName</th>
              <th>EmpAge</th>
              <th>
                <div className="d-flex align-items-center">
                  <span>EmpDept</span>
                  <input
                    type="text"
                    id="deptFilter"
                    className="form-control ms-2"
                    value={filterDept}
                    onChange={handleFilterChange}
                    placeholder="Filter"
                    style={{ width: '100px' }}
                  />
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter(employee =>
                !filterDept || employee.EmpDept.toLowerCase().includes(filterDept.toLowerCase())
              )
              .map((employee, i) => (
                <tr key={i}>
                  <td>{employee.EmpID}</td>
                  <td>
                    <Link to={`/employee/${employee.EmpID}`} className='text-decoration-none'>
                      {employee.EmpName}
                    </Link>
                  </td>
                  <td>{employee.EmpAge}</td>
                  <td>{employee.EmpDept}</td>
                  <td>
                    <Link to={`update/${employee.EmpID}`} className='btn btn-primary'>Update</Link>
                    <button onClick={() => handleDelete(employee.EmpID)} className='btn btn-danger ms-2'>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
