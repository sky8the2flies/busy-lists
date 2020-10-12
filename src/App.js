import React from 'react';
import { Switch, Route } from 'react-router-dom';

import userService from './services/userService';

import NavBar from './components/NavBar/NavBar';
import BusyList from './pages/BusyList/BusyList';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import HomePage from './pages/HomePage/HomePage';

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
            <>
                <NavBar
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                />
                <Switch>
                    {/* Home Page route */}
                    <Route exact path="/" render={() => <HomePage />} />
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
                    {/* Profile Route */}
                    <Route
                        exact
                        path="/accounts/profile"
                        render={() => <></>}
                    />
                    {/* View Board Route */}
                    <Route path="/boards/:id" render={() => <BusyList />} />
                </Switch>
            </>
        );
    }
}

export default App;
