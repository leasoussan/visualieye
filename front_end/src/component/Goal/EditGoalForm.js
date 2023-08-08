import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from 'react-bootstrap/Modal';


function EditGoalForm({ closeModal, goal_data }) {

    const [editedGoalData, setEditedGoalData] = useState({ ...goal_data });
    const [error, setError] = useState('');


    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setEditedGoalData(prevData => ({
            ...prevData,
            title: newTitle,
        }));
    }
    const handleEndDateChange = (e) => {
        const end_date = e.target.value;
        setEditedGoalData({
            ...editedGoalData,
            end_date: end_date,
        });

    }



    const handleSaveChanges = async (e) => {
        e.preventDefault();
        console.log("im trying here and I love it");

        try {

            const response = await fetch(`http://localhost:5000/edit_goal/${editedGoalData.goal_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedGoalData),
            });
            console.log("respose", response);
            const editGoalData = await response.json()
            console.log("editGoalData", editGoalData);


        }
        catch (e) {
            console.log();
            setError({ "handleEdit Error": e.msg })
        };
    }

    return (
        <>
            <Modal show={true} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>Edit Goal</h2>
                    <form onSubmit={handleSaveChanges}>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={editedGoalData.title}
                            onChange={handleTitleChange}
                        />
                        <label>Date:</label>
                        <textarea
                            value={editedGoalData.end_date}
                            onChange={handleEndDateChange}
                        />
                        <button type="submit">Save Changes</button>
                        <button onClick={closeModal}>Cancel</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={closeModal}>
            Close
          </Button> */}
                    {/* <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button> */}
                </Modal.Footer>
            </Modal>

            {/* <div className="modal">
      <div className="modal-content">
        <h2>Edit Goal</h2>
        <form onSubmit={handleSaveChanges}>
          <label>Title:</label>
          <input
            type="text"
            value={editedGoalData.title}
            onChange={handleInputChange}
          />
          <label>Date:</label>
          <textarea
            value={editedGoalData.end_date}
            onChange={handleInputChange}
          />
          <button type="submit">Update</button>
          <button onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </div> */}
        </>
    )

}

export default EditGoalForm;
