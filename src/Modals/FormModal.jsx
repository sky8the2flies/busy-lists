import React from 'react';

function FormModal(props) {
    return (
        <div className="FormModal">
            <header>{props.title}</header>
            <div>{props.children}</div>
        </div>
    );
}

export default FormModal;
