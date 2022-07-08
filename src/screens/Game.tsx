import { SafeAreaView, View } from 'dripsy';
import React from 'react';

import Chess from '../components/ChessBoard';

const Game = () => {
    return (
        <SafeAreaView sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
            <View>
                <Chess />
            </View>
        </SafeAreaView>
    );
};

export default Game;
