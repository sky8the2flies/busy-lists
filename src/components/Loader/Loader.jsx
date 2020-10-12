import React from 'react';
import styled from 'styled-components';

import './Loader.css';

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export default function Loader() {
    return (
        <Container>
            <div className={'Loader'} />
        </Container>
    );
}
