import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from '../Task/Task';

const ContainerColumn = styled.div``;

const Container = styled.div`
    box-shadow: 0px 0px 5px 1px lightgray;
    margin: 8px;
    background-color: white;
    border-radius: 2px;
    min-width: 220px;
    width: 220px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
    border-bottom: 1px solid lightgrey;
    transition: background-color 0.2s ease;
    background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${(props) =>
        props.isDraggingOver ? 'lightgray' : 'inherit'};
    flex-grow: 1;
    min-height: 25px;
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
    render() {
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
                                {this.props.column.title}
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
                                        <NewTask>+ Add new task</NewTask>
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
