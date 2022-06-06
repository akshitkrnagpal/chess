import PieceImages from '../images/pieces';

import styled from 'styled-components/native';

const PieceWrapper = styled.TouchableWithoutFeedback``;

const Piece = styled.Image<{ bottom: number; left: number; size: number }>`
    position: absolute;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    left: ${(props) => props.left}px;
    bottom: ${(props) => props.bottom}px;
`;

const Pieces = ({ board, size, onSelectPiece }) => {
    const cellSize = size / 8;
    return board
        .flat()
        .filter((cell) => cell)
        .map((piece) => {
            const { square, type, color } = piece;
            const [file, rank] = square.split('');
            const left = (file.charCodeAt(0) - 'a'.charCodeAt(0)) * cellSize;
            const bottom = (rank - 1) * cellSize;
            return (
                <PieceWrapper key={`piece-${square}`} onPress={() => onSelectPiece(square)}>
                    <Piece
                        size={size / 8}
                        left={left}
                        bottom={bottom}
                        source={PieceImages[`${color}${type}`.toUpperCase()]}
                    />
                </PieceWrapper>
            );
        });
};

export default Pieces;
