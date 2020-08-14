import React from 'react';
import styled from 'styled-components/native';
import { View, Image, Text } from 'react-native';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format';

momentDurationFormat(moment);

const Container = styled(View)`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 4rem;
    align-items: center;
    justify-content: center;
`;

const Avatar = styled(Image)`
    height: 3rem;
    width: 3rem;
    padding: 0.5rem;
    border-radius: 50%;
`;

const Name = styled(Text)`
    padding: 0.5rem;
    font-size: 1rem;
    flex: 1;
`;

const Time = styled(Text)`
    font-size: 1.25rem;
    padding: 0.5rem;
`;

const User = ({ timer, avatar, name }) => {
    const { time, isRunning } = timer;
    return (
        <Container>
            <Avatar source={{ uri: avatar }} />
            <Name>{name}</Name>
            <Time>{moment.duration(time, 'seconds').format()}</Time>
        </Container>
    );
};

export default User;
