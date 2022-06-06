import styled from 'styled-components/native';

const BOARD_SIZE = 8;

interface BoardProps {
    size: number;
}

interface CellProps {
    color: 'light' | 'dark';
}

const Board = styled.View<BoardProps>`
    display: grid;
    grid-template-columns: repeat(${BOARD_SIZE}, 1fr);
    grid-template-rows: repeat(${BOARD_SIZE}, 1fr);
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    background-color: #ccc;
    border-radius: 1%;
    overflow: hidden;
`;

const Cell = styled.View<CellProps>`
    --light-color: #eeeed2;
    --dark-color: #769656;
    ${(props) => `background-color: var(--${props.color}-color)`};
`;

const EmptyBoard = ({ size }) => {
    const n = BOARD_SIZE * BOARD_SIZE;
    return (
        <Board size={size}>
            {[...Array(n)].map((_, index) => {
                const col = Math.floor(index / 8);
                const row = index % 8;
                const color = (row + col) % 2 === 0 ? 'light' : 'dark';
                return <Cell color={color} key={index.toString()} />;
            })}
        </Board>
    );
};

export default EmptyBoard;
