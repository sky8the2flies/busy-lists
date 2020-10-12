import React, { useState } from 'react';
import styled from 'styled-components';

const ParentMenu = styled.div`
    position: relative;
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
    z-index: 99;
`;

const OptionTitle = styled.div`
    text-align: center;
    border-bottom: 1px solid lightgray;
`;

const Options = (props) => {
    const [menu, setMenu] = useState(false);
    const showMenu = menu ? (
        <OptionsMenu>
            {props.name ? <OptionTitle>{props.name}</OptionTitle> : <></>}
            {props.children}
        </OptionsMenu>
    ) : (
        <></>
    );
    return (
        <>
            <ParentMenu>
                <i
                    onClick={() => setMenu(!menu)}
                    className="fas fa-ellipsis-h"
                ></i>
                {showMenu}
            </ParentMenu>
        </>
    );
};

export default Options;
