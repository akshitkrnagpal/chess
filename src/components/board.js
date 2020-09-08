import React from 'react';
import { View, Text, Button } from 'react-native';
import Modal from 'react-native-modal';
import chessRules from 'chess-rules';
import { calculateBestMove } from 'chess-ai';

import Cell from './cell';

const initialState = {
    position: chessRules.getInitialPosition(),
    selectedIndex: null,
    isSelectable: [],
    canMoveHereArray: [],
};

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const { position } = this.state;
        const { whiteTimer, blackTimer } = this.props.timers;

        if (position.turn === 'W') {
            whiteTimer.start();
        } else {
            blackTimer.start();
        }
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
            const { whiteTimer, blackTimer } = this.props.timers;
            const { turn } = position;
            if (turn === 'W') {
                whiteTimer.pause();
                blackTimer.start();
            } else {
                whiteTimer.start();
                blackTimer.pause();
            }

            const updatedPosition = chessRules.applyMove(position, move);

            this.setState({
                selectedIndex: null,
                position: updatedPosition,
                isSelectable: [],
                canMoveHereArray: [],
            });

            const playComputerMove = () => {
                const nextMove = calculateBestMove(updatedPosition);

                this.setState({
                    position: chessRules.applyMove(updatedPosition, nextMove),
                });

                if (turn === 'W') {
                    blackTimer.pause();
                    whiteTimer.start();
                } else {
                    blackTimer.start();
                    whiteTimer.pause();
                }
            };

            setTimeout(playComputerMove, 5000);
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

        boardView.reverse();

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
            <View>
                <View style={{ flexDirection: 'column' }}>
                    {this.renderCells()}
                    {this.showModal()}
                </View>
            </View>
        );
    }
}

export default Board;
