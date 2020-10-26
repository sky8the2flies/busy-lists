import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import userService from './services/userService';

import NavBar from './components/NavBar/NavBar';
import BusyList from './pages/BusyList/BusyList';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import HomePage from './pages/HomePage/HomePage';
import InvitePage from './pages/InvitePage/InvitePage';

const Container = styled.div`
    max-height: 100vh;
`;

class App extends React.Component {
    state = {
        user: userService.getUser(),
    };

    handleLogout = () => {
        userService.logout();
        this.setState({ user: null });
    };

    handleLoadUser = () => {
        this.setState({ user: userService.getUser() });
    };

    render() {
        return (
            <Container>
                <NavBar
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                />
                <Switch>
                    {/* Home Page route */}
                    <Route
                        exact
                        path="/"
                        render={({ history }) => (
                            <HomePage
                                user={this.state.user}
                                history={history}
                            />
                        )}
                    />
                    {/* Sign Up Route */}
                    <Route
                        exact
                        path="/accounts/signup"
                        render={({ history }) => (
                            <SignupPage
                                history={history}
                                handleLoadUser={this.handleLoadUser}
                            />
                        )}
                    />
                    {/* Log In Route */}
                    <Route
                        exact
                        path="/accounts/login"
                        render={({ history }) => (
                            <LoginPage
                                history={history}
                                handleLoadUser={this.handleLoadUser}
                            />
                        )}
                    />
                    {/* View Board Route */}
                    <Route
                        path="/boards/:id"
                        render={({ history }) => (
                            <BusyList
                                history={history}
                                user={this.state.user}
                            />
                        )}
                    />
                    {/* Invite User Route */}
                    <Route
                        path="/invites/:id"
                        render={() =>
                            userService.getUser() ? (
                                <InvitePage />
                            ) : (
                                <Redirect to="/accounts/login" />
                            )
                        }
                    />
                </Switch>
            </Container>
        );
    }
}

export default App;
