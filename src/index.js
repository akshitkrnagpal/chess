import React from 'react';
import { Dimensions, View, Platform } from 'react-native';

import Board from './components/board';

class Chess extends React.Component {
    render() {
        const { width, height } = Dimensions.get('window');
        const size = Math.min(width, height, 375);
        return (
            <View
                style={{
                    height: Platform.OS !== 'web' ? height : '100%',
                    width: Platform.OS !== 'web' ? width : '100%',
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
