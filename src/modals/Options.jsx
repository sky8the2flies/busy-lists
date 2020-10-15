import React, { useState } from 'react';
import styled from 'styled-components';

const ParentMenu = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const OptionsMenu = styled.div`
    box-shadow: 0 0 5px 1px lightgray;
    position: absolute;
    min-width: 150px;
    min-height: 40px;
    background-color: white;
    padding: 5px;
    border-radius: 5px;
    ${(props) => (props.left ? `right:` : 'left:')} ${(props) =>
        props.content ? `${10 + props.content.length * 7}px` : '25px'};
    top: -10px;
`;

const ChildMenu = styled.div`
    text-align: center;
    height: 100%;
    width: 100%;
    z-index: 999;
`;

const OptionTitle = styled.div`
    text-align: center;
`;

const Options = (props) => {
    const [menu, setMenu] = useState(false);
    const showMenu = menu ? (
        <OptionsMenu content={props.content} left={props.left}>
            {props.name ? (
                <OptionTitle>
                    {props.name}
                    <hr />
                </OptionTitle>
            ) : (
                <></>
            )}
            <ChildMenu>{props.children}</ChildMenu>
        </OptionsMenu>
    ) : (
        <></>
    );
    return (
        <>
            <ParentMenu>
                {props.label ? (
                    <i
                        onClick={() => setMenu(!menu)}
                        className={`clickable ${props.label}`}
                        style={{ color: props.color || 'black' }}
                    >
                        {props.content}
                    </i>
                ) : (
                    <i
                        onClick={() => setMenu(!menu)}
                        className={'clickable fas fa-ellipsis-h'}
                        style={{ color: props.color || 'black' }}
                    >
                        {props.content}
                    </i>
                )}
                {showMenu}
            </ParentMenu>
        </>
    );
};

export default Options;
