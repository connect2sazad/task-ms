import React, { useState, useRef } from 'react';
import axios from 'axios';

import CustomModal from './custommodal.component';

const NewUserRole = ({ onUserRoleCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        permissions: '',
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
            const response = await axios.post('http://localhost:5555/user-roles/create', {
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
                onUserRoleCreated(); // Callback to close the modal and refresh user data
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
                showModalButton="New User Role"
                modalTitle="Create New User Role"
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

export default NewUserRole;

const NewUserForm = ({ formData, handleInputChange }) => {
    return (
        <div className="row">
            <div className="col-6 mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    placeholder="Name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="col-6 mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="role" 
                    placeholder="Role" 
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                />
            </div>
            <div className="col-6 mb-3">
                <label htmlFor="permissions" className="form-label">Permissions</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="permissions" 
                    placeholder="Permissions" 
                    name="permissions"
                    value={formData.permissions}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}
