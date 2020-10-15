import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import boardApi from '../../services/boardApi';
import inviteApi from '../../services/inviteApi';

import NewInviteForm from '../../components/NewInviteForm/NewInviteForm';
import Column from '../../components/Column/Column';
import CardForm from '../../components/CardForm/CardForm';
import Loader from '../../components/Loader/Loader';
import Options from '../../modals/Options';
import Copy from '../../components/Copy/Copy';

const Container = styled.div`
    display: flex;
`;

const ContainerRow = styled.div`
    display: flex;
`;

const BoardRow = styled.div`
    min-height: 89.5vh;
    overflow-x: scroll;
`;

const PageContainer = styled.div`
    background-image: url(https://images.unsplash.com/photo-1540171803164-3b88c6bf8eca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1345&q=80);
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 50px;
    color: white;
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
                        board={this.props.board}
                        handleTaskCreate={this.props.handleTaskCreate}
                        handleColumnDelete={this.props.handleColumnDelete}
                        handleColumnSubmitRename={
                            this.props.handleColumnSubmitRename
                        }
                    />
                ))}
            </>
        );
    }
}

let mounted = false;

class BusyList extends React.Component {
    state = { board: {}, invites: [], loading: true };

    async componentDidMount() {
        mounted = true;
        const id = this.props.match.params.id;
        const board = await boardApi.getOne(id);
        const invites = await inviteApi.getAll(board);
        if (mounted) this.setState({ board, invites, loading: false });
    }
    componentWillUnmount() {
        mounted = false;
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

    handleColumnSubmitRename = (column, index) => {
        let newState = {
            ...this.state.board,
            columns: this.state.board.columns.map((column) => {
                return JSON.parse(JSON.stringify(column));
            }),
        };
        newState.columns.splice(index, 1, column);
        this.handleUpdateBoard(newState);
        this.setState({ board: newState });
    };

    handleInviteCreate = (invite) => {
        const newState = [...this.state.invites];
        newState.push(invite);
        this.setState({ invites: newState });
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
                                        board={this.state.board}
                                        handleTaskCreate={
                                            this.handleComponentCreation
                                        }
                                        handleColumnDelete={
                                            this.handleColumnDelete
                                        }
                                        handleColumnSubmitRename={
                                            this.handleColumnSubmitRename
                                        }
                                    />
                                    {provided.placeholder}
                                </Container>
                                <Container>
                                    <CardForm
                                        boardId={this.state.board._id}
                                        handleColumnCreate={
                                            this.handleComponentCreation
                                        }
                                    />
                                </Container>
                            </ContainerRow>
                        )}
                    </Droppable>
                </DragDropContext>
            </>
        );
        return (
            <PageContainer>
                <Title>
                    <div>
                        <h1 style={{ color: 'white', letterSpacing: '1px' }}>
                            {this.state.board.name}
                        </h1>
                    </div>
                    <div>
                        <h5>
                            <Options
                                left={true}
                                content=" Invite link"
                                label={'fas fa-user-plus'}
                                name="Invites"
                                color="white"
                            >
                                {this.state.invites.map((invite, index) => (
                                    <Copy key={index} invite={invite} />
                                ))}
                                <hr />
                                <NewInviteForm
                                    board={this.state.board}
                                    handleInviteCreate={this.handleInviteCreate}
                                />
                            </Options>
                        </h5>
                    </div>
                </Title>
                <BoardRow>{content}</BoardRow>
            </PageContainer>
        );
    }
}

export default withRouter(BusyList);
