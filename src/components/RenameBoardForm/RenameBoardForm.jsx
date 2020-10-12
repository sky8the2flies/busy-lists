import React, { useState } from 'react';
import styled from 'styled-components';

import boardApi from '../../services/boardApi';

const FormContainer = styled.div`
    margin: 2px 5px;
    min-height: 50px;
`;

const RenameBoardForm = (props) => {
    const [form, setForm] = useState({ name: props.board.name });

    const handleChange = (e) => {
        setForm({ [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const newBoard = { ...props.board };
            newBoard.name = form.name;
            boardApi.updateBoard(newBoard);
            props.handleSubmitRename(newBoard.name);
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
                <button>Submit</button>
            </form>
            <button onClick={() => props.handleCancelRename()}>Cancel</button>
        </FormContainer>
    );
};

export default RenameBoardForm;
