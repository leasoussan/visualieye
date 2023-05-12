import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AddGoalForm from "./AddGoalForm";

function ModalForm({ show, close, goalType, user_id}) {
    const [showModal, setShowModal] = useState(show);

        // console.log("show",show );
        // console.log("close", close);
        // console.log("goalType", goalType);
        // console.log("userId", user_id);

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
                            <Modal.Header closeButton>
                                <Modal.Title>{goalType.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AddGoalForm userId={user_id} goalType={goalType}  close={close}/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={close}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    


                    :
                    null
            }

        </>
    )
}

export default ModalForm;
