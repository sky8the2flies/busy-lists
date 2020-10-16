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
    min-height: 94.7vh;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: flex-start;
    background-color: #e4e3e3;
    min-height: 94.5vh;
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
    min-height: 35px;
    font-weight: 500;
    letter-spacing: 1px;
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
        let boards = await boardApi.getAll();
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

    handleGetStarted = () => {
        if (this.props.user) {
            this.setState({ newForm: true });
        } else {
            this.props.history.push('/accounts/signup');
        }
    };

    render() {
        const content = this.state.loading ? (
            <Loader />
        ) : this.props.user ? (
            <>
                {this.state.boards.map((board, index) => (
                    <BoardContainer key={board._id}>
                        {this.state.editBoard !== index ? (
                            <>
                                <Link
                                    className={'HomePage-board reset-link'}
                                    to={`/boards/${board._id}`}
                                >
                                    <p>
                                        {board.name}{' '}
                                        <span>
                                            {board.authors[0] ===
                                            this.props.user._id ? (
                                                <i className="far fa-check-circle"></i>
                                            ) : (
                                                ''
                                            )}
                                        </span>
                                    </p>
                                </Link>
                                <Options name={board.name}>
                                    <Link
                                        className={
                                            'HomePage-options reset-link'
                                        }
                                        to={`/boards/${board._id}`}
                                    >
                                        View
                                    </Link>
                                    <OptionsContainer
                                        className={'clickable'}
                                        onClick={() =>
                                            this.setState({ editBoard: index })
                                        }
                                    >
                                        Rename
                                    </OptionsContainer>
                                    <OptionsContainer
                                        className={'clickable'}
                                        style={{ color: 'red' }}
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
        ) : (
            <></>
        );
        const newForm = this.state.newForm ? (
            <BoardForm
                history={this.props.history}
                handleBoardCreate={this.handleBoardCreate}
                handleNewBoardForm={this.handleNewBoardForm}
            />
        ) : (
            <NewFormContainer
                className={'clickable btn'}
                onClick={() => this.handleNewBoardForm()}
            >
                + New Board
            </NewFormContainer>
        );
        const sideBar = this.props.user ? (
            <Container>
                {content}
                {newForm}
            </Container>
        ) : (
            <></>
        );

        return (
            <PageContainer>
                {sideBar}
                <div className="HomePage-container">
                    <div className="HomePage-header">
                        <div className="HomePage-header-info">
                            <h1>
                                Welcome to{' '}
                                <span className="HomePage-title">
                                    BusyLists
                                </span>
                            </h1>
                            <p>Stay busy, simply.</p>
                            <br />
                            <h5
                                onClick={() => this.handleGetStarted()}
                                className="HomePage-btn"
                            >
                                {this.props.user ? 'Add board' : 'Get Started'}
                            </h5>
                        </div>
                    </div>
                </div>
            </PageContainer>
        );
    }
}

export default HomePage;
