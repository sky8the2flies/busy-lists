import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';
import Options from '../../modals/Options';
import RenameColumnForm from '../RenameColumnForm/RenameColumnForm';

const ContainerColumn = styled.div``;

const Container = styled.div`
    margin: 8px;
    background-color: white;
    border-radius: 2px;
    min-width: 220px;
    width: 220px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    padding: 8px;
    border-bottom: 1px solid lightgrey;
    transition: background-color 0.2s ease;
    background-color: ${(props) => (props.isDragging ? '#40a8c4' : 'white')};
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${(props) =>
        props.isDraggingOver ? '#e5e5e5' : 'inherit'};
    flex-grow: 1;
    min-height: 25px;
`;
const OptionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 100%;
    font-size: 15px;
`;
const NewTask = styled.div`
    padding: 5px;
    text-align: center;
`;

class InnerList extends React.PureComponent {
    render() {
        return (
            <>
                {this.props.tasks.map((task, index) => (
                    <Task key={task._id} task={task} index={index} />
                ))}
            </>
        );
    }
}

export default class Column extends React.Component {
    state = {
        rename: false,
        newTask: false,
    };

    handleSubmitRename = (column, index) => {
        this.setState({ rename: false });
        this.props.handleColumnSubmitRename(column, index);
    };

    handleCancelRename = () => {
        this.setState({ rename: false });
    };

    handleCancelTask = () => {
        this.setState({ newTask: false });
    };

    render() {
        const content = this.state.rename ? (
            <RenameColumnForm
                column={this.props.column}
                index={this.props.index}
                board={this.props.board}
                handleSubmitRename={this.handleSubmitRename}
                handleCancelRename={this.handleCancelRename}
            />
        ) : (
            <>{this.props.column.title}</>
        );
        const taskContent = this.state.newTask ? (
            <TaskForm
                board={this.props.board}
                columnId={this.props.column._id}
                handleTaskCreate={this.props.handleTaskCreate}
                handleCancelTask={this.handleCancelTask}
            />
        ) : (
            <NewTask
                className="clickable"
                onClick={() => this.setState({ newTask: true })}
            >
                + Add new Task
            </NewTask>
        );
        return (
            <Draggable
                draggableId={String(this.props.index)}
                index={this.props.index}
            >
                {(provided, snapshot) => (
                    <ContainerColumn>
                        <Container
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                        >
                            <Title
                                {...provided.dragHandleProps}
                                isDragging={snapshot.isDragging}
                            >
                                {content}
                                <Options name={this.props.column.title}>
                                    <OptionsContainer
                                        className="clickable"
                                        onClick={() => {
                                            this.setState({
                                                rename: !this.state.rename,
                                            });
                                        }}
                                    >
                                        Rename
                                    </OptionsContainer>
                                    <OptionsContainer
                                        className="clickable"
                                        style={{ color: 'red' }}
                                        onClick={() =>
                                            this.props.handleColumnDelete(
                                                this.props.column
                                            )
                                        }
                                    >
                                        Delete
                                    </OptionsContainer>
                                </Options>
                            </Title>
                            <Droppable
                                droppableId={String(this.props.index)}
                                type="task"
                            >
                                {(provided, snapshot) => (
                                    <TaskList
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        isDraggingOver={snapshot.isDraggingOver}
                                    >
                                        <InnerList
                                            tasks={this.props.column.tasks}
                                        />
                                        {provided.placeholder}
                                        {taskContent}
                                    </TaskList>
                                )}
                            </Droppable>
                        </Container>
                    </ContainerColumn>
                )}
            </Draggable>
        );
    }
}
