import React from 'react';
import { Switch, Route } from 'react-router-dom';

import userService from './services/userService';

import NavBar from './components/NavBar/NavBar';
import BusyList from './pages/BusyList/BusyList';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

class App extends React.Component {
    state = {
        user: userService.getUser(),
    };

    handleLogout = () => {
        userService.logout();
        this.setState({ user: null });
    };

    render() {
        return (
            <div>
                <NavBar
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                />
                <Switch>
                    {/* Home Page route */}
                    <Route exact path="/" render={() => <></>} />
                    {/* Sign Up Route */}
                    <Route
                        exact
                        path="/accounts/signup"
                        render={() => <SignupPage />}
                    />
                    {/* Log In Route */}
                    <Route
                        exact
                        path="/accounts/login"
                        render={() => <LoginPage />}
                    />
                    {/* Profile Route */}
                    <Route
                        exact
                        path="/accounts/profile"
                        render={() => <></>}
                    />
                    {/* View Board Route */}
                    <Route path="/boards/:bid" render={() => <BusyList />} />
                </Switch>
            </div>
        );
    }
}

export default App;
