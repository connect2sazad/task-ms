import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

import CustomModal from './custommodal.component';

const Newuser = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitUserReg = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:5555/users/create', {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password
            }, {
                headers: {
                    'Authorization': token
                }
            });

            console.log(response.data);
            // Do something with the response, like setting state or redirecting
        } catch (error) {
            console.error('Login failed:', error);
            // Handle errors, maybe set an error message state or show an alert
        }
    };

    return (
        <>
            <CustomModal
                modalSize="lg"
                showModalButton="New User"
                modalTitle="Create New User"
                modalBody={
                    <NewUserForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                }
                modalFooter={
                    <button className="btn btn-primary" onClick={handleSubmitUserReg}>Create</button>
                }
            />
        </>
    );
}

export default Newuser;

const NewUserForm = ({ formData, handleInputChange }) => {
    return (
        <>
            <div className="row">
                <div className="col-6 mb-3">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="first_name" 
                        placeholder="First Name" 
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="last_name" 
                        placeholder="Last Name" 
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password" 
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </>
    );
}
