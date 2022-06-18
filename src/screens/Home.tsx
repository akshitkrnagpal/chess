import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

import EmptyBoard from '../components/EmptyBoard';

const Wrapper = styled.SafeAreaView`
    display: flex;
    flex: 1;
    align-items: center;
`;

const PlayButton = styled.Button``;

const Home = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const boardSize = Math.min(width, 400);
    return (
        <Wrapper>
            <EmptyBoard size={boardSize} />
            <PlayButton color='#000' title='Play Now' onPress={() => navigation.navigate('Game')} />
        </Wrapper>
    );
};

export default Home;
