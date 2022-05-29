import React from 'react';
import { Dimensions, SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';
import { useTimer } from 'use-timer';
import moment from 'moment';
import { name, avatar } from 'random-profile-generator';

import Board from './components/board';
import User from './components/user';

const Wrapper = styled(SafeAreaView)`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Game = styled(View)`
    max-width: 375px;
`;

const white = {
    name: name(),
    avatar: avatar(),
};

const black = {
    name: name(),
    avatar: avatar(),
};

const TIME = moment.duration(5, 'minutes');

const useCountdownTimer = (options) => {
    return useTimer({
        initialTime: TIME.asSeconds(),
        timerType: 'DECREMENTAL',
        ...options,
    });
};

const App = () => {
    const { width, height } = Dimensions.get('window');
    const size = Math.min(width, height, 375);

    const whiteTimer = useCountdownTimer();
    const blackTimer = useCountdownTimer();

    return (
        <Wrapper>
            <Game>
                <User {...black} timer={blackTimer} />
                <Board size={size} timers={{ blackTimer, whiteTimer }} />
                <User {...white} timer={whiteTimer} />
            </Game>
        </Wrapper>
    );
};

export default App;
