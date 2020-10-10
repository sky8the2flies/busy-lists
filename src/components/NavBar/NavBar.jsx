import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    height: 50px;
    background-color: white;
    box-shadow: 0px 0px 5px 1px lightgrey;
    margin-bottom: 5px;
    align-content: center;
    justify-content: flex-end;
    align-items: center;
`;

const NavLink = styled.div`
    width: 50px;
    height: 100%;
    text-align: center;
    margin: 0px 10px;
`;

const NavBar = (props) => {
    let loggedIn = !props.user ? (
        <>
            <p>Welcome user.</p>
        </>
    ) : (
        <>
            <Link to={'/accounts/login'}>
                <NavLink>Login</NavLink>
            </Link>
            <Link to={'/accounts/signup'}>
                <NavLink>Sign Up</NavLink>
            </Link>
        </>
    );
    return <Container>{loggedIn}</Container>;
};

export default NavBar;
