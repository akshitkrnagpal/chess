import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Modal from 'react-native-modal';
import chessRules from 'chess-rules';
import { calculateBestMove } from 'chess-ai';

import Cell from './cell';

const initialBoard = {
    position: chessRules.getInitialPosition(),
    selectedIndex: null,
    isSelectable: [],
    canMoveHereArray: [],
};

const Board = (props) => {
    const [board, setBoard] = useState(initialBoard);
    const { timers } = props;

    useEffect(() => {
        const { position } = board;
        const { whiteTimer, blackTimer } = timers;

        if (position.turn === 'W') {
            whiteTimer.start();
        } else {
            blackTimer.start();
        }
    }, []);

    const reset = () => {
        setBoard(initialBoard);
    };

    const handleClick = (index) => {
        const { position, selectedIndex, isSelectable, canMoveHereArray } =
            board;

        if (isSelectable.includes(index)) {
            setBoard((board) => ({
                ...board,
                selectedIndex: index,
                canMoveHereArray: [],
            }));
        }

        if (canMoveHereArray.includes(index)) {
            const move = { src: selectedIndex, dst: index };
            const { whiteTimer, blackTimer } = timers;
            const { turn } = position;
            if (turn === 'W') {
                whiteTimer.pause();
                blackTimer.start();
            } else {
                whiteTimer.start();
                blackTimer.pause();
            }

            const updatedPosition = chessRules.applyMove(position, move);

            setBoard((board) => ({
                ...board,
                selectedIndex: null,
                position: updatedPosition,
                isSelectable: [],
                canMoveHereArray: [],
            }));

            const playComputerMove = () => {
                const nextMove = calculateBestMove(updatedPosition);

                setBoard((board) => ({
                    ...board,
                    position: chessRules.applyMove(updatedPosition, nextMove),
                }));

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
    };

    const renderCells = () => {
        const { size } = props;

        const { position, selectedIndex, isSelectable, canMoveHereArray } =
            board;

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

        position.board.forEach((cell, index) => {
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
                    handleClick={() => handleClick(index)}
                />
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
    };

    const getGameStatus = () => {
        return chessRules.getGameStatus(board.position);
    };

    const showModal = () => {
        return (
            <Modal
                animationType='slide'
                transparent
                visible={getGameStatus() !== 'OPEN'}
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
                            {getWinnerText()}
                        </Text>
                        <Button title='New Game' onPress={reset} />
                    </View>
                </View>
            </Modal>
        );
    };

    const getWinnerText = () => {
        let whiteWon = getGameStatus() === 'WHITEWON';
        let blackWon = getGameStatus() === 'BLACKWON';

        if (whiteWon) return 'White Wins';
        if (blackWon) return 'Black Wins';

        return 'Match Draw';
    };

    return (
        <View>
            <View style={{ flexDirection: 'column' }}>
                {renderCells()}
                {showModal()}
            </View>
        </View>
    );
};

export default Board;
