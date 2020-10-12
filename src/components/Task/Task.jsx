import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    box-shadow: 0 0 5px 1px lightgray;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

export default class Task extends React.Component {
    render() {
        return (
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
                            onClick={() => console.log('test')}
                        >
                            {this.props.task.content}
                        </Container>
                    </>
                )}
            </Draggable>
        );
    }
}
