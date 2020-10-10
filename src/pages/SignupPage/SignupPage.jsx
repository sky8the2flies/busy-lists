import React from 'react';
import { Link } from 'react-router-dom';

import FormModal from '../../Modals/FormModal';

class SignupPage extends React.Component {
    state = {
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
    };

    isFormInvalid() {
        return !(
            this.state.email && this.state.password === this.state.passwordConf
        );
    }

    render() {
        return (
            <FormModal title="Sign up" className="SignupPage">
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
                                value={this.state.password}
                                name="password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={this.state.passwordConf}
                                name="passwordConf"
                                onChange={this.handleChange}
                            />
                        </div>
                        <button disabled={this.isFormInvalid()}>Sign Up</button>
                        <Link to="/">Cancel</Link>
                    </div>
                </form>
                <div>
                    <p>
                        Already have an account?{' '}
                        <Link to="/accounts/login">Login</Link>
                    </p>
                </div>
            </FormModal>
        );
    }
}

export default SignupPage;
