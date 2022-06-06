import styled from 'styled-components/native';
import Svg, { Circle } from 'react-native-svg';

const MoveWrapper = styled.TouchableWithoutFeedback``;

const Move = styled.View<{ bottom: number; left: number; size: number }>`
    position: absolute;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    left: ${(props) => props.left}px;
    bottom: ${(props) => props.bottom}px;
`;

const Moves = ({ visibleMoves, size, onSelectMove }) => {
    const cellSize = size / 8;
    return visibleMoves.map((move) => {
        const { to, captured, promotion } = move;
        const [file, rank] = to.split('');
        const left = (file.charCodeAt(0) - 'a'.charCodeAt(0)) * cellSize;
        const bottom = (rank - 1) * cellSize;
        return (
            <MoveWrapper onPressOut={() => onSelectMove(move)} key={`move-${to}`}>
                <Move size={size / 8} left={left} bottom={bottom}>
                    <Svg height='100%' width='100%' viewBox='0 0 100 100'>
                        <Circle
                            cx='50'
                            cy='50'
                            r={captured ? '40' : '20'}
                            fill={captured ? 'none' : 'black'}
                            fillOpacity={captured ? undefined : '0.2'}
                            stroke={captured ? 'black' : undefined}
                            strokeOpacity={captured ? '0.2' : undefined}
                            strokeWidth={captured ? '10' : undefined}
                        />
                    </Svg>
                </Move>
            </MoveWrapper>
        );
    });
};

export default Moves;
