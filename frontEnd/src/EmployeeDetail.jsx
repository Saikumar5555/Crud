import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function EmployeeDetail() {
  const { EmpID } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/${EmpID}`)
      .then(res => {
        console.log('Employee data:', res.data); // Log employee data for debugging
        setEmployee(res.data);
      })
      .catch(err => console.log(err));
  }, [EmpID]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <div className="d-flex justify-content-end mb-3">
          <Link to='/' className='btn btn-secondary'>Back</Link>
        </div>
        <table className='table'>
          <tbody>
            <tr><td>EmpID</td><td>{employee.EmpID}</td></tr>
            <tr><td>EmpName</td><td>{employee.EmpName}</td></tr>
            <tr><td>EmpAge</td><td>{employee.EmpAge}</td></tr>
            <tr><td>EmpNumber</td><td>{employee.EmpNumber}</td></tr>
            <tr><td>EmpDept</td><td>{employee.EmpDept}</td></tr>
            <tr>
              <td>EmpPhoto</td>
              <td>
                {employee.EmpPhoto ? (
                  <img src={`http://localhost:3000/${employee.EmpPhoto}`} alt={employee.EmpName} style={{ width: '100px' }} />
                ) : (
                  'No Photo Available'
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDetail;
