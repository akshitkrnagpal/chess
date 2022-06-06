import { useState } from 'react';
import { Chess, ChessInstance } from 'chess.js';

const useChess = () => {
    const [chessInstance] = useState<ChessInstance | undefined>(new Chess());

    return chessInstance;
};

export default useChess;
