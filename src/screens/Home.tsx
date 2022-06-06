import styled from 'styled-components/native';

import EmptyBoard from '../components/EmptyBoard';

const Wrapper = styled.SafeAreaView`
    display: flex;
    flex: 1;
    align-items: center;
`;

const PlayButton = styled.Button`
    width: 400px;
`;

const Home = ({ navigation }) => {
    const onPress = () => {
        navigation.navigate('Game');
    };
    return (
        <Wrapper>
            <EmptyBoard size={400} />
            <PlayButton color='#000' title='Play Now' onPress={onPress} />
        </Wrapper>
    );
};

export default Home;
