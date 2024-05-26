import React from 'react';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

const CustomModal = ({ showModalButton, modalTitle, modalBody, modalFooter, modalSize }) => {

    // xl
    // lg
    // sm

    return (
        <>

            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                {showModalButton}
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={"modal-dialog modal-dialog-scrollable modal-dialog-centered modal-" + (modalSize ? modalSize : 'sm')}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{modalTitle}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {modalBody}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {modalFooter ? modalFooter : ''}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default CustomModal;
