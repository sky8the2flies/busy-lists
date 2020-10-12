import React from 'react';
import { Link } from 'react-router-dom';

import boardApi from '../../services/boardApi';

import BoardForm from '../../components/BoardForm/BoardForm';

class HomePage extends React.Component {
    state = {
        boards: [],
    };

    async componentDidMount() {
        const boards = await boardApi.getAll();
        this.setState({ boards });
    }

    handleBoardCreate = async (board) => {
        const newState = this.state.boards.map((board) =>
            JSON.parse(JSON.stringify(board))
        );
        newState.push(board);
        this.setState({ boards: newState });
    };

    render() {
        return (
            <>
                <h1>Home Page</h1>
                {this.state.boards.map((board) => (
                    <Link key={board._id} to={`/boards/${board._id}`}>
                        {board.name}
                    </Link>
                ))}
                <BoardForm
                    history={this.props.history}
                    handleBoardCreate={this.handleBoardCreate}
                />
            </>
        );
    }
}

export default HomePage;
