import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    margin: 2px 5px;
    min-height: 50px;
`;

const RenameColumnForm = (props) => {
    const [form, setForm] = useState({ title: props.column.title });

    const handleChange = (e) => {
        setForm({ [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const newColumn = { ...props.column };
            newColumn.title = form.title;
            props.handleSubmitRename(newColumn, props.index);
        } catch (err) {
            console.log(err);
            //display err for user
        }
    };

    function isFormValid() {
        return !form.title;
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Enter column name"
                    value={form.title}
                    onChange={handleChange}
                />
                <button disabled={isFormValid()}>Submit</button>
            </form>
            <button onClick={() => props.handleCancelRename()}>Cancel</button>
        </FormContainer>
    );
};

export default RenameColumnForm;
