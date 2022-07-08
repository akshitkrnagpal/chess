import PieceImages from '../images/pieces';

import { Image } from 'dripsy';
import { TouchableWithoutFeedback } from 'react-native';

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
                <TouchableWithoutFeedback
                    key={`piece-${square}`}
                    onPress={() => onSelectPiece(square)}
                >
                    <Image
                        sx={{
                            position: 'absolute',
                            width: cellSize,
                            height: cellSize,
                            left,
                            bottom,
                        }}
                        source={PieceImages[`${color}${type}`.toUpperCase()]}
                    />
                </TouchableWithoutFeedback>
            );
        });
};

export default Pieces;
