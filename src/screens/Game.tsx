import React from 'react';
import styled from 'styled-components/native';

import Chess from '../components/ChessBoard';

const Wrapper = styled.SafeAreaView`
    display: flex;
    flex: 1;
    align-items: center;
`;

const Container = styled.View``;

const Game = () => {
    return (
        <Wrapper>
            <Container>
                <Chess />
            </Container>
        </Wrapper>
    );
};

export default Game;
