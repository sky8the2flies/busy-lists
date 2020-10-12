import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import boardApi from '../../services/boardApi';
import './HomePage.css';

import BoardForm from '../../components/BoardForm/BoardForm';
import Loader from '../../components/Loader/Loader';
import Options from '../../modals/Options';
import RenameBoardForm from '../../components/RenameBoardForm/RenameBoardForm';

const PageContainer = styled.div`
    display: flex;
    flex-grow: 1;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: flex-start;
    background-color: lightgray;
    height: 94vh;
    padding: 10px;
    width: 25vw;
    max-width: 300px;
    min-width: 150px;
`;

const BoardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 40px;
`;

const NewFormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 100%;
`;

const OptionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 100%;
`;

class HomePage extends React.Component {
    state = {
        boards: [],
        loading: true,
        newForm: false,
        editBoard: -1,
    };

    async componentDidMount() {
        const boards = await boardApi.getAll();
        this.setState({ boards, loading: false });
    }

    handleBoardCreate = (board) => {
        const newState = this.state.boards.map((board) =>
            JSON.parse(JSON.stringify(board))
        );
        newState.push(board);
        this.setState({ boards: newState });
    };

    handleBoardDelete = async (boardId, index) => {
        this.setState({ loading: true });
        await boardApi.deleteBoard(boardId);
        const newState = this.state.boards.map((board) =>
            JSON.parse(JSON.stringify(board))
        );
        newState.splice(index, 1);
        this.setState({ boards: newState, loading: false });
    };

    handleNewBoardForm = () => {
        this.setState({ newForm: !this.state.newForm });
    };

    handleSubmitRename = (name) => {
        const newState = this.state.boards.map((board) =>
            JSON.parse(JSON.stringify(board))
        );
        newState[this.state.editBoard].name = name;
        this.setState({ boards: newState, editBoard: -1 });
    };

    handleCancelRename = () => {
        this.setState({ editBoard: -1 });
    };

    render() {
        const content = this.state.loading ? (
            <Loader />
        ) : (
            <>
                {this.state.boards.map((board, index) => (
                    <BoardContainer key={board._id}>
                        {this.state.editBoard !== index ? (
                            <>
                                <Link
                                    className={'HomePage-board'}
                                    to={`/boards/${board._id}`}
                                >
                                    {board.name}
                                </Link>
                                <Options name={board.name}>
                                    <Link
                                        className={'HomePage-options'}
                                        to={`/boards/${board._id}`}
                                    >
                                        View
                                    </Link>
                                    <OptionsContainer
                                        onClick={() =>
                                            this.setState({ editBoard: index })
                                        }
                                    >
                                        Rename
                                    </OptionsContainer>
                                    <OptionsContainer
                                        onClick={() =>
                                            this.handleBoardDelete(
                                                board._id,
                                                index
                                            )
                                        }
                                    >
                                        Delete
                                    </OptionsContainer>
                                </Options>
                            </>
                        ) : (
                            <>
                                <RenameBoardForm
                                    board={board}
                                    handleSubmitRename={this.handleSubmitRename}
                                    handleCancelRename={this.handleCancelRename}
                                />
                            </>
                        )}
                    </BoardContainer>
                ))}
            </>
        );
        const newForm = this.state.newForm ? (
            <BoardForm
                history={this.props.history}
                handleBoardCreate={this.handleBoardCreate}
                handleNewBoardForm={this.handleNewBoardForm}
            />
        ) : (
            <NewFormContainer onClick={() => this.handleNewBoardForm()}>
                + New Board
            </NewFormContainer>
        );

        return (
            <PageContainer>
                <Container>
                    {content}
                    {newForm}
                </Container>
                <div>
                    <h1>Home Page</h1>
                </div>
            </PageContainer>
        );
    }
}

export default HomePage;
