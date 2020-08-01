import React from 'react';
import { View, Text, Button } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import chessRules from 'chess-rules';

import Cell from './cell';

const initialState = {
    position: chessRules.getInitialPosition(),
    selectedIndex: null,
    isSelectable: [],
    canMoveHereArray: [],
};

class Board extends React.Component {
    static propTypes = {
        size: PropTypes.number.isRequired,
        currentPlayer: PropTypes.oneOf(['W', 'B']),
    };

    static defaultProps = {
        currentPlayer: 'W',
    };

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    reset() {
        this.setState(initialState);
    }

    handleClick(index) {
        const {
            position,
            selectedIndex,
            isSelectable,
            canMoveHereArray,
        } = this.state;

        if (isSelectable.includes(index)) {
            this.setState({
                selectedIndex: index,
                canMoveHereArray: [],
            });
        }

        if (canMoveHereArray.includes(index)) {
            const move = { src: selectedIndex, dst: index };
            const updatedPosition = chessRules.applyMove(position, move);

            this.setState({
                selectedIndex: null,
                position: updatedPosition,
                isSelectable: [],
                canMoveHereArray: [],
            });
        }
    }

    renderCells() {
        const { size, currentPlayer } = this.props;

        const {
            position,
            selectedIndex,
            isSelectable,
            canMoveHereArray,
        } = this.state;

        const board = position.board;
        const rowViews = [];

        const cellSize = size / 8;

        const availableMoves = chessRules.getAvailableMoves(position);

        availableMoves.forEach(function (move) {
            if (move.src === selectedIndex) {
                canMoveHereArray.push(move.dst);
            }
            if (!isSelectable.includes(move.src)) {
                isSelectable.push(move.src);
            }
        });

        board.forEach((cell, index) => {
            const rowIndex = Math.floor(index / 8);
            const columnIndex = index % 8;

            let piece = null;
            if (cell) {
                piece = cell.side.concat(cell.type);
            }

            let selected = false;
            if (selectedIndex === index) {
                selected = true;
            }

            let canMoveHere = false;
            if (canMoveHereArray.includes(index)) {
                canMoveHere = true;
            }

            if (!rowViews[rowIndex]) {
                rowViews[rowIndex] = [];
            }
            rowViews[rowIndex].push(
                <Cell
                    key={index}
                    size={cellSize}
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    piece={piece}
                    selected={selected}
                    canMoveHere={canMoveHere}
                    handleClick={this.handleClick.bind(this, index)}
                />,
            );
        });

        const boardView = rowViews.map((row, index) => {
            return (
                <View key={index} style={{ flexDirection: 'row' }}>
                    {row}
                </View>
            );
        });

        if (currentPlayer === 'W') {
            boardView.reverse();
        }

        return boardView;
    }

    getGameStatus() {
        return chessRules.getGameStatus(this.state.position);
    }

    showModal() {
        return (
            <Modal
                animationType='slide'
                transparent
                visible={this.getGameStatus() !== 'OPEN'}
                ariaHideApp={false}
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    <View
                        style={{
                            textAlign: 'center',
                            backgroundColor: 'white',
                            paddingHorizontal: 64,
                            paddingVertical: 32,
                            borderRadius: 10,
                        }}
                    >
                        <Text style={{ fontSize: 18, marginBottom: 14 }}>
                            {this.getWinnerText()}
                        </Text>
                        <Button
                            title='New Game'
                            onPress={this.reset.bind(this)}
                        />
                    </View>
                </View>
            </Modal>
        );
    }

    getWinnerText() {
        let whiteWon = this.getGameStatus() === 'WHITEWON';
        let blackWon = this.getGameStatus() === 'BLACKWON';

        if (whiteWon) return 'White Wins';
        if (blackWon) return 'Black Wins';

        return 'Match Draw';
    }

    render() {
        return (
            <View style={{ maxWidth: 375 }}>
                <View style={{ flexDirection: 'column' }}>
                    {this.renderCells()}
                    {this.showModal()}
                </View>
            </View>
        );
    }
}

export default Board;
