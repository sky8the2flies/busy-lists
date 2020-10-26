import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import EditTask from '../EditTask/EditTask';

const Container = styled.div`
    box-shadow: 0 0 5px 1px lightgray;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    min-height: 20px;
    background-color: ${(props) => (props.isDragging ? '#40a8c4' : 'white')};
`;

export default class Task extends React.Component {
    state = { editTask: false };

    handleTaskToggle = (value) => {
        if (!isUserInBoard(this.props.user, this.props.board)) return;
        this.setState({
            editTask: value || !this.state.editTask,
        });
    };

    render() {
        return (
            <>
                <Draggable
                    draggableId={this.props.task._id}
                    index={this.props.index}
                >
                    {(provided, snapshot) => (
                        <>
                            <Container
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                isDragging={snapshot.isDragging}
                                onClick={() => this.handleTaskToggle()}
                            >
                                <p className="task">
                                    {this.props.task.content}
                                    {'  '}
                                    {this.props.user &&
                                    this.props.task.assigned.includes(
                                        this.props.user.username
                                    ) ? (
                                        <span style={{ color: 'red' }}>
                                            Assigned{' '}
                                            <i className="fas fa-exclamation-circle"></i>
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                </p>
                                {this.props.task.due &&
                                daysUntil(new Date(this.props.task.due)) >=
                                    0 ? (
                                    <p
                                        style={{
                                            color: '#0d7377',
                                            fontWeight: '600',
                                        }}
                                        className="center"
                                    >
                                        Due in{' '}
                                        {daysUntil(
                                            new Date(this.props.task.due)
                                        )}{' '}
                                        day(s)
                                    </p>
                                ) : (
                                    <>
                                        {' '}
                                        {this.props.task.due &&
                                        daysUntil(
                                            new Date(this.props.task.due)
                                        ) < 0 ? (
                                            <p
                                                style={{
                                                    color: '#de4463',
                                                    fontWeight: '600',
                                                }}
                                                className="center"
                                            >
                                                Overdue
                                            </p>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                )}
                            </Container>
                        </>
                    )}
                </Draggable>
                {this.state.editTask ? (
                    <EditTask
                        board={this.props.board}
                        task={this.props.task}
                        column={this.props.column}
                        handleTaskToggle={this.handleTaskToggle}
                        handleTaskUpdate={this.props.handleTaskUpdate}
                    />
                ) : (
                    <></>
                )}
            </>
        );
    }
}

function daysUntil(date) {
    const today = new Date();
    if (today.getMonth() === 11 && today.getDate() > 25) {
        date.setFullYear(date.getFullYear() + 1);
    }
    const one_day = 1000 * 60 * 60 * 24;
    return Math.ceil((date.getTime() - today.getTime()) / one_day);
}

function isUserInBoard(user, board) {
    return user && board.authors && board.authors.find(() => user);
}
