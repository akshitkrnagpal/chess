import useChess from '../hooks/useChess';
import EmptyBoard from './EmptyBoard';

import styled from 'styled-components/native';
import Pieces from './Pieces';
import Moves from './Moves';
import { useState } from 'react';

const SIZE = 400;

const Wrapper = styled.View`
    position: relative;
`;

const useRandomMove = (chess) => {
    while (!chess.game_over() && chess.turn() === 'b') {
        const moves = chess.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        chess.move(move);
    }
};

const Chess = () => {
    const chess = useChess();
    const [visibleMoves, setVisibleMoves] = useState([]);

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
        <Wrapper>
            <EmptyBoard size={SIZE} />
            <Pieces board={chess.board()} onSelectPiece={handleSelectPiece} size={SIZE} />
            <Moves visibleMoves={visibleMoves} onSelectMove={handleSelectMove} size={SIZE} />
        </Wrapper>
    );
};

export default Chess;
