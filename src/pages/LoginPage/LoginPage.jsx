import React from 'react';
import { Link } from 'react-router-dom';

import './LoginPage.css';

import Error from '../../modals/Error';
import userService from '../../services/userService';

class LoginPage extends React.Component {
    state = {
        email: '',
        password: '',
        err: null,
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.login(this.state);
            this.props.handleLoadUser();
            this.props.history.push('/');
        } catch (err) {
            this.setState({ err: 'Your email or password is incorrect.' });
        }
    };

    closeErr = () => {
        this.setState({ err: null });
    };

    render() {
        const err = this.state.err ? (
            <Error closeErr={this.closeErr}>
                <h1>Login Error</h1>
                <p>{this.state.err}</p>
            </Error>
        ) : (
            <></>
        );
        return (
            <div className="container LoginPage-container">
                {err}
                <h1>Login</h1>
                <form className="LoginPage-form" onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={this.state.email}
                        name="email"
                        onChange={this.handleChange}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        name="password"
                        onChange={this.handleChange}
                    />
                    <button>Log In</button>
                    <Link className="btn reset-link" to="/">
                        Cancel
                    </Link>
                </form>
                <div>
                    <p>
                        Don't have an account?{' '}
                        <Link to="/accounts/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default LoginPage;
