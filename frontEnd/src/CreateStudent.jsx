import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateStudent() {
    const [EmpName, setEmpName] = useState('');
    const [EmpAge, setEmpAge] = useState('');
    const [EmpDept, setEmpDept] = useState('');
    const [EmpNumber, setEmpNumber] = useState('');
    const [EmpPhoto, setEmpPhoto] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('EmpName', EmpName);
        formData.append('EmpAge', EmpAge);
        formData.append('EmpDept', EmpDept);
        formData.append('EmpNumber', EmpNumber); // Add EmpNumber to FormData
        formData.append('EmpPhoto', EmpPhoto);

        axios.post('http://localhost:3000/employee', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res);
            navigate('/');
        })
        .catch(err => console.error(err));
    }

    // Function to handle image preview
    const handleImagePreview = (e) => {
        const file = e.target.files[0];
        setEmpPhoto(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                    <div className="mb-2">
                        <label htmlFor="name">Emp Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Enter Name" 
                            className="form-control"
                            value={EmpName}
                            onChange={e => setEmpName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="age">Emp Age</label>
                        <input 
                            type="text" 
                            id="age" 
                            placeholder="Enter Age" 
                            className="form-control"
                            value={EmpAge}
                            onChange={e => setEmpAge(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="dept">Emp Dept</label>
                        <input 
                            type="text" 
                            id="dept" 
                            placeholder="Enter Dept" 
                            className="form-control"
                            value={EmpDept}
                            onChange={e => setEmpDept(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="number">Emp Number</label>
                        <input 
                            type="text" 
                            id="number" 
                            placeholder="Enter Number" 
                            className="form-control"
                            value={EmpNumber}
                            onChange={e => setEmpNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="photo">Emp Photo</label>
                        <input 
                            type="file" 
                            id="photo" 
                            className="form-control"
                            onChange={handleImagePreview} // Use handleImagePreview to show preview
                        />
                        {imagePreview && (
                            <img src={imagePreview} alt="Emp Preview" className="img-fluid mt-2" style={{ maxHeight: '200px' }} />
                        )}
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateStudent;
