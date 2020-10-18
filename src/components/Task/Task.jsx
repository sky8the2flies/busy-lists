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

    handleTaskToggle = () => {
        this.setState({
            editTask: !this.state.editTask,
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
                                {this.props.task.content}
                            </Container>
                        </>
                    )}
                </Draggable>
                {this.state.editTask ? (
                    <EditTask handleTaskToggle={this.handleTaskToggle} />
                ) : (
                    <></>
                )}
            </>
        );
    }
}
