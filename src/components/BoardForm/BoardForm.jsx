import React, { useState } from 'react';
import styled from 'styled-components';

import boardApi from '../../services/boardApi';

const FormContainer = styled.div`
    margin: 2px 5px;
    height: 50px;
`;

const BoardForm = (props) => {
    const [form, setForm] = useState({ name: '' });

    const handleChange = (e) => {
        setForm({ [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const board = await boardApi.createBoard(form);
            setForm({ name: '' });
            props.handleBoardCreate(board);
            props.history.push(`/boards/${board._id}`);
        } catch (err) {
            console.log(err);
            //display err for user
        }
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Enter board name"
                    value={form.name}
                    onChange={handleChange}
                />
                <button>Add Board</button>
                <p className="btn" onClick={() => props.handleNewBoardForm()}>
                    Cancel
                </p>
            </form>
        </FormContainer>
    );
};

export default BoardForm;
