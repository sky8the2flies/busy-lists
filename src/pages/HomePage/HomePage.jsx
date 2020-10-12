import React from 'react';
import { Link } from 'react-router-dom';

import boardApi from '../../services/boardApi';

import BoardForm from '../../components/BoardForm/BoardForm';
import Loader from '../../components/Loader/Loader';

class HomePage extends React.Component {
    state = {
        boards: [],
        loading: true,
    };

    async componentDidMount() {
        const boards = await boardApi.getAll();
        this.setState({ boards, loading: false });
    }

    handleBoardCreate = async (board) => {
        const newState = this.state.boards.map((board) =>
            JSON.parse(JSON.stringify(board))
        );
        newState.push(board);
        this.setState({ boards: newState });
    };

    render() {
        const content = this.state.loading ? (
            <Loader />
        ) : (
            <>
                {this.state.boards.map((board) => (
                    <Link key={board._id} to={`/boards/${board._id}`}>
                        {board.name}
                    </Link>
                ))}
            </>
        );
        return (
            <>
                <h1>Home Page</h1>
                {content}
                <BoardForm
                    history={this.props.history}
                    handleBoardCreate={this.handleBoardCreate}
                />
            </>
        );
    }
}

export default HomePage;
