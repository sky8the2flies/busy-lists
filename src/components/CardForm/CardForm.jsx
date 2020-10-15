import React, { useState } from 'react';
import styled from 'styled-components';

import boardApi from '../../services/boardApi';

const FormContainer = styled.div`
    display: flex;
    margin: 8px;
    background-color: white;
    border-radius: 2px;
    width: 220px;
    flex-direction: column;
    max-height: 90px;
    padding: 5px;
`;

const CardForm = (props) => {
    const [form, setForm] = useState({ title: '' });

    const handleChange = (e) => {
        setForm({ [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const board = await boardApi.createColumn(props.boardId, form);
            setForm({ title: '' });
            props.handleColumnCreate(board);
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
                    placeholder="Enter card title"
                    value={form.title}
                    onChange={handleChange}
                />
                <button disabled={isFormValid()}>Add Card</button>
            </form>
        </FormContainer>
    );
};

export default CardForm;
