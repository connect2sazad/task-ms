import React, { useState, useRef } from 'react';
import axios from 'axios';

import CustomModal from './custommodal.component';

const NewUser = ({ onUserCreated }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        userid: ''
    });
    const [showModal, setShowModal] = useState(false);
    const closeButtonRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitUserReg = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:5555/users/create', {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password,
                userid: formData.userid
            }, {
                headers: {
                    'Authorization': token
                }
            });

            if (response.status === 201) {
                onUserCreated(); // Callback to close the modal and refresh user data
                setShowModal(false); // Close the modal on success

                if (closeButtonRef.current) {
                    closeButtonRef.current.click();
                }

                window.location.reload();
            }

        } catch (error) {
            console.error('Reg failed:', error);
        }
    };

    return (
        <>
            <CustomModal
                modalSize="lg"
                showModalButton="New User"
                modalTitle="Create New User"
                showModal={showModal}
                onShowModalChange={setShowModal} // Pass the state setter
                onModalClose={() => setShowModal(false)}
                modalBody={
                    <NewUserForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                }
                modalFooter={
                    <button className="btn btn-primary" onClick={handleSubmitUserReg}>Create</button>
                }
                closeButtonRef={closeButtonRef} // Pass the ref to the modal
            />
        </>
    );
}

export default NewUser;

const NewUserForm = ({ formData, handleInputChange }) => {
    return (
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
            <div className="col-6 mb-3">
                <label htmlFor="userid" className="form-label">Userid</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="userid" 
                    placeholder="userid" 
                    name="userid"
                    value={formData.userid}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}
