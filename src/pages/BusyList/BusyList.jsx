import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import boardApi from '../../services/boardApi';

import Column from '../../components/Column/Column';
import CardForm from '../../components/CardForm/CardForm';
import Loader from '../../components/Loader/Loader';

const Container = styled.div`
    display: flex;
`;

const ContainerRow = styled.div`
    display: flex;
`;

const BoardRow = styled.div`
    height: 93vh;
    overflow-x: scroll;
`;

class InnerList extends React.PureComponent {
    render() {
        return (
            <>
                {this.props.columns.map((column, index) => (
                    <Column
                        key={index}
                        column={column}
                        index={index}
                        boardId={this.props.boardId}
                        handleTaskCreate={this.props.handleTaskCreate}
                        handleColumnDelete={this.props.handleColumnDelete}
                    />
                ))}
            </>
        );
    }
}

class BusyList extends React.Component {
    state = { board: {}, loading: true };

    async componentDidMount() {
        const id = this.props.match.params.id;
        const board = await boardApi.getOne(id);
        this.setState({ board, loading: false });
    }

    handleUpdateBoard = (updateData) => {
        boardApi.updateBoard(updateData);
    };

    handleComponentCreation = async (board) => {
        this.setState({ board });
    };

    handleColumnDelete = async (column) => {
        this.setState({ loading: true });
        const board = await boardApi.deleteColumn(this.state.board._id, column);
        this.setState({ board, loading: false });
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
            this.handleUpdateBoard(newState);
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
        this.handleUpdateBoard(newState);
        this.setState({ board: newState });
    };

    render() {
        const content = this.state.loading ? (
            <Loader />
        ) : (
            <>
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
                                        handleTaskCreate={
                                            this.handleComponentCreation
                                        }
                                        handleColumnDelete={
                                            this.handleColumnDelete
                                        }
                                        boardId={this.state.board._id}
                                    />
                                    {provided.placeholder}
                                </Container>
                                <CardForm
                                    boardId={this.state.board._id}
                                    handleColumnCreate={
                                        this.handleComponentCreation
                                    }
                                />
                            </ContainerRow>
                        )}
                    </Droppable>
                </DragDropContext>
            </>
        );
        return <BoardRow>{content}</BoardRow>;
    }
}

export default withRouter(BusyList);
