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
    position: absolute;
    width: 150px;
    min-height: 40px;
    background-color: white;
    box-shadow: 2px 2px 10px 1px lightgray;
    padding: 5px;
    border-radius: 5px;
    left: 20px;
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
        <OptionsMenu>
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
                {props.content ? (
                    <>{props.content}</>
                ) : (
                    <i
                        onClick={() => setMenu(!menu)}
                        className={'clickable fas fa-ellipsis-h'}
                    ></i>
                )}
                {showMenu}
            </ParentMenu>
        </>
    );
};

export default Options;
