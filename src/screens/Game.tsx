import React from 'react';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components/native';
import { useTimer } from 'use-timer';
import moment from 'moment';
import { name, avatar } from 'random-profile-generator';

import Board from '../components/board';
import User from '../components/user';

const Wrapper = styled(View)`
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

const useCountdownTimer = () => {
    return useTimer({
        initialTime: TIME.asSeconds(),
        timerType: 'DECREMENTAL',
    });
};

const Game = () => {
    const { width, height } = Dimensions.get('window');
    const size = Math.min(width, height, 375);

    const whiteTimer = useCountdownTimer();
    const blackTimer = useCountdownTimer();

    return (
        <Wrapper>
            <User {...black} timer={blackTimer} />
            <Board size={size} timers={{ blackTimer, whiteTimer }} />
            <User {...white} timer={whiteTimer} />
        </Wrapper>
    );
};

export default Game;
