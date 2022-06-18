import styled from 'styled-components/native';
import { FlatGrid } from 'react-native-super-grid';

const BOARD_SIZE = 8;

interface BoardProps {
    size: number;
}

interface CellProps {
    size: number;
    color: 'light' | 'dark';
}

const Board = styled.View<BoardProps>`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    background-color: #ccc;
    border-radius: 1%;
    overflow: hidden;
`;

const Cell = styled.View<CellProps>`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    background-color: ${(props) => (props.color === 'dark' ? '#769656' : '#eeeed2')};
`;

const EmptyBoard = ({ size }) => {
    return (
        <Board size={size}>
            <FlatGrid
                staticDimension={size}
                itemDimension={size / BOARD_SIZE}
                fixed
                spacing={0}
                data={[...Array(BOARD_SIZE * BOARD_SIZE).keys()]}
                renderItem={({ item: index }) => {
                    const col = Math.floor(index / BOARD_SIZE);
                    const row = index % BOARD_SIZE;
                    const color = (row + col) % 2 === 0 ? 'light' : 'dark';
                    return <Cell size={size / BOARD_SIZE} color={color} key={index.toString()} />;
                }}
            />
        </Board>
    );
};

export default EmptyBoard;
