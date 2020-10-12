import React from 'react';
import { Link } from 'react-router-dom';

import boardApi from '../../services/boardApi';

class HomePage extends React.Component {
    state = {
        boards: [],
    };

    async componentDidMount() {
        const boards = await boardApi.getAll();
        this.setState({ boards });
    }

    render() {
        return (
            <>
                <h1>Home Page</h1>
                {this.state.boards.map((board) => (
                    <Link key={board._id} to={`/boards/${board._id}`}>
                        {board.name}
                    </Link>
                ))}
            </>
        );
    }
}

export default HomePage;
