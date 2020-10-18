import React from 'react';
import styled from 'styled-components';

const ParentMenu = styled.div`
    position: ${(props) => (props.floating ? 'absolute' : 'relative')};
    width: 50%;
    opacity: 0.5;
    padding: 10px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
        props.bgColor ? `${props.bgColor}` : 'red'};
    color: ${(props) => (props.color ? `${props.color}` : 'white')};
`;

const CloseMenu = styled.div`
    position: absolute;
    right: 5%;
    font-size: 1.2em;
`;

const Error = (props) => {
    return (
        <ParentMenu floating={props.floating}>
            <CloseMenu onClick={() => props.closeErr()} className="clickable">
                &times;
            </CloseMenu>
            <Content color={props.color} bgColor={props.bgColor}>
                {props.children}
            </Content>
        </ParentMenu>
    );
};

export default Error;
