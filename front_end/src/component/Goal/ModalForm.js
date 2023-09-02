import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AddGoalForm from './AddGoalForm.js';

function ModalForm({ show, close, goalType, user_id}) {
    const [showModal, setShowModal] = useState(show);

  
        useEffect(()=>{
            setShowModal(show);

        },[show]);




    return (
        <>
            {
                show ?
                
                // console.log(goal_type, userId)

                    <div className="modal_container" onClick={(e) => e.stopPropagation()}>

                        <Modal show={showModal}>
                            <Modal.Header closeButton onClick={close}>
                                <Modal.Title>{goalType.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AddGoalForm userId={user_id} goalType={goalType}  close={close}/>
                            </Modal.Body>
                        </Modal>
                    </div>
                    


                    :
                    null
            }

        </>
    )
}

export default ModalForm;
