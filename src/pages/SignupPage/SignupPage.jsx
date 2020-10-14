import React from 'react';
import { Link } from 'react-router-dom';

import userService from '../../services/userService';

class SignupPage extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConf: '',
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.signup(this.state);
            this.props.handleLoadUser();
            this.props.history.push('/');
        } catch (err) {
            console.log({ err });
            //TODO Show user err
        }
    };

    isFormInvalid() {
        return !(
            this.state.username &&
            this.state.email &&
            this.state.password === this.state.passwordConf
        );
    }

    render() {
        return (
            <div className="container">
                <h1>Sign up</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="container-col">
                        <input
                            type="text"
                            placeholder="Display name"
                            value={this.state.username}
                            name="username"
                            onChange={this.handleChange}
                        />
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
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={this.state.passwordConf}
                            name="passwordConf"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button disabled={this.isFormInvalid()}>Sign Up</button>
                    <Link className="btn reset-link" to="/">
                        Cancel
                    </Link>
                </form>
                <div>
                    <p>
                        Already have an account?{' '}
                        <Link to="/accounts/login">Login</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default SignupPage;
