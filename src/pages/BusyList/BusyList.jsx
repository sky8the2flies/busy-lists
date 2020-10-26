import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import boardApi from '../../services/boardApi';
import inviteApi from '../../services/inviteApi';
import imageApi from '../../services/imageApi';

import './BusyList.css';

import NewInviteForm from '../../components/NewInviteForm/NewInviteForm';
import Column from '../../components/Column/Column';
import CardForm from '../../components/CardForm/CardForm';
import Loader from '../../components/Loader/Loader';
import Options from '../../modals/Options';
import Copy from '../../components/Copy/Copy';
import ImageForm from '../../components/ImageForm/ImageForm';

const Container = styled.div`
    display: flex;
`;

const ContainerRow = styled.div`
    display: flex;
`;

const BoardRow = styled.div`
    min-height: 89.3vh;
    overflow-x: auto;
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
                        user={this.props.user}
                        handleTaskCreate={this.props.handleTaskCreate}
                        handleTaskUpdate={this.props.handleTaskUpdate}
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
    state = {
        board: {},
        invites: [],
        showImages: false,
        images: [],
        loading: true,
    };

    async componentDidMount() {
        mounted = true;
        const id = this.props.match.params.id;
        const board = await boardApi.getOne(id);
        if (!board._id) {
            this.props.history.push('/');
            return;
        }
        const invites = await inviteApi.getAll(board);
        const images = await imageApi.getAll();
        if (mounted)
            this.setState({
                board,
                invites,
                images: images.results,
                loading: false,
            });
    }
    componentWillUnmount() {
        mounted = false;
    }

    handleUpdateBoard = (updateData) => {
        if (!isUserInBoard(this.props.user, this.state.board)) return;
        boardApi.updateBoard(updateData);
    };

    handleComponentCreation = async (board) => {
        if (!isUserInBoard(this.props.user, this.state.board)) return;
        this.setState({ board });
    };

    handleColumnDelete = async (column) => {
        if (!isUserInBoard(this.props.user, this.state.board)) return;
        this.setState({ loading: true });
        const board = await boardApi.deleteColumn(this.state.board._id, column);
        this.setState({ board, loading: false });
    };

    handleColumnSubmitRename = (column, index) => {
        if (!isUserInBoard(this.props.user, this.state.board)) return;
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

    handleTaskUpdate = (board) => {
        if (!isUserInBoard(this.props.user, this.state.board)) return;
        this.setState({ board });
    };

    handleInviteCreate = (invite) => {
        if (!isUserInBoard(this.props.user, this.state.board)) return;
        const newState = [...this.state.invites];
        newState.push(invite);
        this.setState({ invites: newState });
    };

    handleImageChange = (image) => {
        if (!isUserInBoard(this.props.user, this.state.board)) return;
        const board = JSON.parse(JSON.stringify(this.state.board));
        board.bgUrl = image.urls.full;
        this.setState({ board, showImages: false });
    };

    onDragEnd = (result) => {
        if (!isUserInBoard(this.props.user, this.state.board)) return;
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
                                        user={this.props.user}
                                        handleTaskCreate={
                                            this.handleComponentCreation
                                        }
                                        handleTaskUpdate={this.handleTaskUpdate}
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
                                    {isUserInBoard(
                                        this.props.user,
                                        this.state.board
                                    ) ? (
                                        <CardForm
                                            boardId={this.state.board._id}
                                            handleColumnCreate={
                                                this.handleComponentCreation
                                            }
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </Container>
                            </ContainerRow>
                        )}
                    </Droppable>
                </DragDropContext>
            </>
        );
        const imageContent = this.state.showImages ? (
            <div className="BusyList-images">
                <ImageForm
                    images={this.state.images}
                    handleImageChange={this.handleImageChange}
                />
            </div>
        ) : (
            <></>
        );
        return (
            <div
                className="BusyList-page-container"
                style={{
                    backgroundImage: this.state.board.bgUrl
                        ? `url(${this.state.board.bgUrl})`
                        : '#16697a',
                    backgroundColor: this.state.board.bgUrl
                        ? `${this.state.board.bgUrl}`
                        : '#16697a',
                }}
            >
                <Title>
                    <div>
                        <h1 style={{ color: 'white', letterSpacing: '1px' }}>
                            {this.state.board.name}
                        </h1>
                    </div>
                    {isUserInBoard(this.props.user, this.state.board) ? (
                        <>
                            {' '}
                            <div>
                                <h5
                                    style={{ color: 'white' }}
                                    className="clickable"
                                    onClick={() =>
                                        this.setState({
                                            showImages: !this.state.showImages,
                                        })
                                    }
                                >
                                    Change Background
                                </h5>
                                {imageContent}
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
                                        {this.state.invites.map(
                                            (invite, index) => (
                                                <Copy
                                                    key={index}
                                                    invite={invite}
                                                />
                                            )
                                        )}
                                        <hr />
                                        <NewInviteForm
                                            board={this.state.board}
                                            handleInviteCreate={
                                                this.handleInviteCreate
                                            }
                                        />
                                    </Options>
                                </h5>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </Title>
                <BoardRow>{content}</BoardRow>
            </div>
        );
    }
}

function isUserInBoard(user, board) {
    return user && board.authors && board.authors.find(() => user);
}

export default withRouter(BusyList);
