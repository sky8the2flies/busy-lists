import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import boardApi from '../../services/boardApi';

import 'react-datepicker/dist/react-datepicker.css';
import './EditTask.css';

const EditTask = (props) => {
    const [form, setForm] = useState({
        content: props.task.content,
        description: props.task.description,
        assigned: props.task.assigned,
        due: props.task.due ? new Date(props.task.due) : null,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e) => {
        let value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setForm({ ...form, [e.target.name]: value });
    };

    function handleDateChange(date) {
        setForm({ ...form, due: date });
    }

    function handleRemoveAssigned(id) {
        const value = form.assigned.filter((user) => user !== id);
        setForm({ ...form, assigned: value });
    }

    function handleRemoveDue() {
        setForm({ ...form, due: null });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const task = { ...props.task, ...form };
            const board = await boardApi.updateTask(
                props.board._id,
                props.column._id,
                task
            );
            props.handleTaskToggle(false);
            props.handleTaskUpdate(board);
        } catch (err) {
            console.log(err);
            //display err for user
        }
    };

    const handleDelete = async () => {
        try {
            const board = await boardApi.deleteTask(
                props.board._id,
                props.column._id,
                props.task
            );
            props.handleTaskToggle(false);
            props.handleTaskUpdate(board);
        } catch (err) {
            console.log(err);
        }
    };

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
                <div className="EditTask-form-container">
                    <form onSubmit={handleSubmit} className="EditTask-form">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={form.content}
                            name="content"
                            onChange={handleChange}
                        />
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            rows="5"
                            name="description"
                            onChange={handleChange}
                            defaultValue={form.description}
                        ></textarea>
                        <h5>Date Due</h5>
                        {form.due ? (
                            <div className="EditTask-form-group w-100">
                                <DatePicker
                                    selected={form.due}
                                    onChange={(date) => handleDateChange(date)}
                                />
                                <p
                                    style={{ backgroundColor: 'red' }}
                                    className="btn w-25"
                                    onClick={() => handleRemoveDue()}
                                >
                                    Remove
                                </p>
                            </div>
                        ) : (
                            <>
                                <p
                                    className="btn w-25"
                                    onClick={() =>
                                        setForm({ ...form, due: new Date() })
                                    }
                                >
                                    Add due date
                                </p>
                            </>
                        )}
                        <h5>Assigned Users</h5>
                        <div className="EditTask-form-group w-100">
                            <div className="EditTask-form-group w-25">
                                <select
                                    onChange={handleSelectChange}
                                    name="assigned"
                                    multiple={true}
                                >
                                    {props.board.authors.map((user) => (
                                        <option
                                            key={user._id}
                                            value={user.username}
                                        >
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="EditTask-form-group w-75">
                                {form.assigned.map((user) => (
                                    <div
                                        key={user}
                                        onClick={() =>
                                            handleRemoveAssigned(user)
                                        }
                                        className="EditTask-assigned clickable"
                                    >
                                        {user}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            style={{ height: '30px' }}
                            className="EditTask-form-group center"
                        >
                            <button className="w-25">Save Task</button>
                            <p
                                className="btn w-25"
                                style={{ backgroundColor: 'red' }}
                                onClick={() => handleDelete()}
                            >
                                Delete Task
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditTask;
