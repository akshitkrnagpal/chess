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
    height: 64px;
    align-items: center;
    justify-content: center;
`;

const Avatar = styled(Image)`
    height: 48px;
    width: 48px;
    padding: 8px;
    border-radius: 24px;
`;

const Name = styled(Text)`
    padding: 8px;
    font-size: 16px;
    flex: 1;
`;

const Time = styled(Text)`
    font-size: 20px;
    padding: 8px;
`;

const User = ({ timer, avatar, name }) => {
    const { time } = timer;
    return (
        <Container>
            <Avatar source={{ uri: avatar }} />
            <Name>{name}</Name>
            <Time>{moment.duration(time, 'seconds').format()}</Time>
        </Container>
    );
};

export default User;
