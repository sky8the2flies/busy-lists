import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import './NavBar.css';

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
    background-color: #3b6978;
`;

const NavBar = (props) => {
    let loggedIn = props.user ? (
        <>
            <p style={{ color: 'white' }}>Welcome {props.user.username}</p>
            <Link className="reset-link" to="/">
                <div className="NavBar-link" onClick={props.handleLogout}>
                    LOG OUT
                </div>
            </Link>
        </>
    ) : (
        <>
            <Link className="reset-link" to={'/accounts/login'}>
                <div className="NavBar-link">LOGIN</div>
            </Link>
            <Link className="reset-link" to={'/accounts/signup'}>
                <div className="NavBar-link">SIGN UP</div>
            </Link>
        </>
    );
    return (
        <Container>
            <ContainerLeft>
                <Link to="/">
                    <h1>
                        <i
                            style={{ color: 'white' }}
                            className="far fa-calendar-check"
                        ></i>
                    </h1>
                </Link>
            </ContainerLeft>
            <ContainerRight>{loggedIn}</ContainerRight>
        </Container>
    );
};

export default NavBar;
