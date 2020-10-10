import React from 'react';
import { Link } from 'react-router-dom';

import FormModal from '../../Modals/FormModal';

class LoginPage extends React.Component {
    state = {
        email: '',
        pw: '',
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
    };

    render() {
        return (
            <FormModal title="Log In" className="LoginPage">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={this.state.email}
                                name="email"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={this.state.pw}
                                name="pw"
                                onChange={this.handleChange}
                            />
                        </div>
                        <button>Log In</button>
                        <Link to="/">Cancel</Link>
                    </div>
                </form>
                <div>
                    <p>
                        Don't have an account?{' '}
                        <Link to="/accounts/signup">Sign Up</Link>
                    </p>
                </div>
            </FormModal>
        );
    }
}

export default LoginPage;
