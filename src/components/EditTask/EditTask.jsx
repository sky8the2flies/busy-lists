import React from 'react';

import './EditTask.css';

const EditTask = (props) => {
    return (
        <>
            <div
                onClick={() => props.handleTaskToggle()}
                className="EditTask-cover"
            ></div>
            <div className="EditTask-container">
                <div
                    onClick={() => props.handleTaskToggle()}
                    className="clickable EditTask-close"
                >
                    &times;
                </div>
            </div>
        </>
    );
};

export default EditTask;
