import React from 'react';
import { Button } from 'react-native';

import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled(SafeAreaView)`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Home = ({ navigation }) => {
    const onPress = () => {
        navigation.navigate('Game');
    };
    return (
        <Wrapper>
            <Button title='Play now' onPress={onPress} />
        </Wrapper>
    );
};

export default Home;
