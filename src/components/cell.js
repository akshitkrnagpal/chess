import React from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import PieceImages from '../images/pieces';

const Cell = (props) => {
    const {
        size,
        rowIndex,
        columnIndex,
        piece,
        selected,
        canMoveHere,
        handleClick,
    } = props;

    const isBlack = (rowIndex + columnIndex) % 2 === 0;
    let backgroundColor = isBlack ? '#F0D9B5' : '#B58863';

    if (selected) {
        backgroundColor = '#48d1cc';
    } else if (canMoveHere) {
        backgroundColor = '#00ffff';
    }

    return (
        <TouchableWithoutFeedback onPress={handleClick}>
            <View style={{ backgroundColor, width: size, height: size }}>
                {piece ? (
                    <Image
                        source={PieceImages[piece]}
                        style={{ width: size, height: size }}
                    />
                ) : null}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Cell;
