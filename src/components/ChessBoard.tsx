import { View } from 'dripsy';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import useChess from '../hooks/useChess';
import EmptyBoard from './EmptyBoard';
import Moves from './Moves';
import Pieces from './Pieces';

const useRandomMove = (chess) => {
    while (!chess.isGameOver() && chess.turn() === 'b') {
        const moves = chess.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        chess.move(move);
    }
};

const Chess = () => {
    const { width } = useWindowDimensions();
    const chess = useChess();
    const [visibleMoves, setVisibleMoves] = useState([]);
    const boardSize = Math.min(width, 400);

    useRandomMove(chess);

    const handleSelectPiece = (square) => {
        const moves = chess.moves({ square: square, verbose: true });
        setVisibleMoves(moves);
    };

    const handleSelectMove = (move) => {
        // Always promote to queen
        chess.move(move.promotion ? { ...move, promotion: 'q' } : move);
        setVisibleMoves([]);
    };

    return (
        <View sx={{ position: 'relative' }}>
            <EmptyBoard size={boardSize} />
            <Pieces board={chess.board()} onSelectPiece={handleSelectPiece} size={boardSize} />
            <Moves visibleMoves={visibleMoves} onSelectMove={handleSelectMove} size={boardSize} />
        </View>
    );
};

export default Chess;
