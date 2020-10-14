import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ContainerRight = styled.div`
    display: flex;
    align-content: center;
    justify-content: flex-end;
    align-items: center;
`;

const ContainerLeft = styled.div`
    display: flex;
    align-content: center;
    justify-content: flex-end;
    align-items: center;
    margin-left: 20px;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    height: 50px;
    background-color: white;
    box-shadow: 0px 0px 5px 1px lightgrey;
`;

const NavLink = styled.div`
    width: 50px;
    height: 100%;
    text-align: center;
    margin: 0px 10px;
    color: black;
`;

const NavBar = (props) => {
    let loggedIn = props.user ? (
        <>
            <p>Welcome {props.user.username}</p>
            <Link to="/">
                <NavLink onClick={props.handleLogout}>Log out</NavLink>
            </Link>
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
    return (
        <Container>
            <ContainerLeft>
                <Link to="/">
                    <h1>
                        <i className="far fa-calendar-check"></i>
                    </h1>
                </Link>
            </ContainerLeft>
            <ContainerRight>{loggedIn}</ContainerRight>
        </Container>
    );
};

export default NavBar;
