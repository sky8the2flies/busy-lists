import React, { useState } from 'react';
import styled from 'styled-components';

import boardApi from '../../services/boardApi';

const FormContainer = styled.div`
    display: flex;
    box-shadow: 0px 0px 5px 1px lightgray;
    margin: 8px;
    background-color: white;
    border-radius: 2px;
    width: 220px;
    flex-direction: column;
    min-height: 50px;
    height: 75px;
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

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Enter card title"
                    value={form.title}
                    onChange={handleChange}
                />
                <button>Add Card</button>
            </form>
        </FormContainer>
    );
};

export default CardForm;
