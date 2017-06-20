import React from 'react';

import './EditTimeModal.css';

const EditTimeModal = (props) => {

    let textInput = null;

    function handleChangeTime() {
        let time = textInput.value;
        props.changeTime(time);
    }

    return (
        <div className="editTimeModal">
            <div className="editTimeModal-container">
                <div>
                    <label htmlFor="durationMinutes">Enter focus time in minutes:</label>
                    <input type="text" 
                        placeholder="Focus Time..." 
                        name="durationMinutes" 
                        maxLength="2" 
                        ref={(input) => {textInput = input; }}
                        />
                </div>
                {/*<div>
                    <label htmlFor="breakMinutes">Enter break time in minutes:</label>
                    <input type="text" placeholder="Break time..." name="breakMinutes" maxLength="2" />
                </div>*/}
                <p className="warning">Warning: If you change the time the timer will reset!</p>
                <div className="editTimeModal-buttons">
                    <button onClick={handleChangeTime}>Change</button>
                    <button onClick={props.handleEditTime}>Cancel</button>
                </div>
            </div>
        </div>
        )
}

export default EditTimeModal;