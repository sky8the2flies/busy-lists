import React, { useState } from 'react';
import styled from 'styled-components';

import boardApi from '../../services/boardApi';

const FormContainer = styled.div`
    margin: 2px 5px;
    height: 50px;
`;

const TaskForm = (props) => {
    const [form, setForm] = useState({ content: '' });

    const handleChange = (e) => {
        setForm({ [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const board = await boardApi.createTask(
                props.board._id,
                props.columnId,
                form
            );
            setForm({ content: '' });
            props.handleTaskCreate(board);
        } catch (err) {
            console.log(err);
            //display err for user
        }
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <input
                    name="content"
                    placeholder="Enter task name"
                    value={form.content}
                    onChange={handleChange}
                />
                <button>Add Task</button>
            </form>
        </FormContainer>
    );
};

export default TaskForm;
