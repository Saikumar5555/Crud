import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(res => setEmployees(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (EmpID) => {
    try {
      await axios.delete(`http://localhost:3000/employee/${EmpID}`);
      // Update state to remove the deleted employee
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
              <th>EmpDept</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, i) => (
              <tr key={i}>
                <td>{employee.EmpID}</td>
                <td>{employee.EmpName}</td>
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
