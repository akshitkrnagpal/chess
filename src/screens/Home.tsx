import React from 'react';
import { SafeAreaView, Image, Button } from 'react-native';
import styled from 'styled-components/native';

import homeImage from '../images/home.jpg';

const Wrapper = styled(SafeAreaView)`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const HomeImage = styled(Image)`
    width: 100%;
    height: 30%;
`;

const PlayButton = styled.Button`
    width: 100%;
    background-color: #000;
`;

const Home = ({ navigation }) => {
    const onPress = () => {
        navigation.navigate('Game');
    };
    return (
        <Wrapper>
            <HomeImage source={homeImage} />
            <PlayButton title='Play Now' onPress={onPress} />
        </Wrapper>
    );
};

export default Home;
