import React from 'react';
import { Dimensions, View } from 'react-native';

import Board from './components/board';

class Chess extends React.Component {
    render() {
        const { width, height } = Dimensions.get('window');
        const size = Math.min(width, height);
        return (
            <View
                style={{
                    height,
                    width,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Board size={size} />
            </View>
        );
    }
}

export default Chess;
