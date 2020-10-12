import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import boardApi from '../../services/boardApi';

import Column from '../../components/Column/Column';
import CardForm from '../../components/CardForm/CardForm';

const Container = styled.div`
    display: flex;
`;

const ContainerRow = styled.div`
    display: flex;
`;

const BoardRow = styled.div`
    overflow-x: scroll;
    height: 100%;
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
    state = { board: { columns: [] } };

    async componentDidMount() {
        const id = this.props.match.params.id;
        const board = await boardApi.getOne(id);
        this.setState({ board });
    }

    handleUpdateColumns = (updateData) => {
        boardApi.updateColumns(updateData);
    };

    handleColumnCreate = async (board) => {
        this.setState({ board });
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
            let newState = {
                ...this.state.board,
                columns: this.state.board.columns.map((column) => {
                    return JSON.parse(JSON.stringify(column));
                }),
            };
            const updateColumn = newState.columns.splice(source.index, 1)[0];
            newState.columns.splice(destination.index, 0, updateColumn);
            this.handleUpdateColumns(newState);
            this.setState({ board: newState });
            return;
        }
        // DROP ENDED FOR TASKS
        let newState = {
            ...this.state.board,
            columns: this.state.board.columns.map((column) => {
                return JSON.parse(JSON.stringify(column));
            }),
        };
        const updateStartColumn = newState.columns[source.droppableId];
        const updateFinishColumn = newState.columns[destination.droppableId];
        const updateTask = updateStartColumn.tasks.splice(source.index, 1)[0];
        updateFinishColumn.tasks.splice(destination.index, 0, updateTask);
        this.handleUpdateColumns(newState);
        this.setState({ board: newState });
    };

    render() {
        return (
            <BoardRow>
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
                                    <InnerList
                                        columns={this.state.board.columns}
                                    />
                                    {provided.placeholder}
                                </Container>
                                <CardForm
                                    boardId={this.state.board._id}
                                    handleColumnCreate={this.handleColumnCreate}
                                />
                            </ContainerRow>
                        )}
                    </Droppable>
                </DragDropContext>
            </BoardRow>
        );
    }
}

export default withRouter(BusyList);
