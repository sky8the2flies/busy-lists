import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import columnApi from '../../services/boardApi';
import Column from '../../components/Column/Column';

const Container = styled.div`
    display: flex;
`;

const ContainerRow = styled.div`
    display: flex;
`;

class InnerList extends React.PureComponent {
    render() {
        return (
            <>
                {this.props.columns.map((column, index) => (
                    <Column key={index} column={column} index={index} />
                ))}
            </>
        );
    }
}

class BusyList extends React.Component {
    state = {
        columns: [],
    };

    async componentDidMount() {
        const columns = await columnApi.getAll();
        this.setState({ columns });
    }

    handleUpdateColumn = (updateData) => {
        columnApi.update(updateData);
    };

    onDragEnd = (result) => {
        const { destination, source, type } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        // DROP ENDED FOR COLUMN
        if (type === 'column') {
            let newState = this.state.columns.map((column) => {
                return JSON.parse(JSON.stringify(column));
            });
            const updateColumn = newState.splice(source.index, 1)[0];
            newState.splice(destination.index, 0, updateColumn);
            newState = newState.map((column, index) => {
                column.position = index;
                this.handleUpdateColumn(column);
                return column;
            });
            this.setState({ columns: newState });
            return;
        }
        // DROP ENDED FOR TASKS
        let newState = this.state.columns.map((column) => {
            return JSON.parse(JSON.stringify(column));
        });
        const updateStartColumn = newState[source.droppableId];
        const updateFinishColumn = newState[destination.droppableId];
        const updateTask = updateStartColumn.tasks.splice(source.index, 1)[0];
        updateFinishColumn.tasks.splice(destination.index, 0, updateTask);
        if (updateStartColumn === updateFinishColumn)
            this.handleUpdateColumn(updateFinishColumn);
        else {
            this.handleUpdateColumn(updateStartColumn);
            this.handleUpdateColumn(updateFinishColumn);
        }
        this.setState({ columns: newState });
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable
                    droppableId="all-columns"
                    direction="horizontal"
                    type="column"
                >
                    {(provided) => (
                        <ContainerRow>
                            <Container
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <InnerList columns={this.state.columns} />
                                {provided.placeholder}
                            </Container>
                            <div>
                                <button>Add new card?</button>
                            </div>
                        </ContainerRow>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default BusyList;
