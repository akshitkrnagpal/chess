import { View } from 'dripsy';
import { FlatGrid } from 'react-native-super-grid';

const BOARD_SIZE = 8;

const EmptyBoard = ({ size }) => {
    return (
        <View
            sx={{
                width: size,
                height: size,
                backgroundColor: '#ccc',
                borderRadius: '1%',
                overflow: 'hidden',
            }}
        >
            <FlatGrid
                staticDimension={size}
                itemDimension={size / BOARD_SIZE}
                fixed
                spacing={0}
                data={[...Array(BOARD_SIZE * BOARD_SIZE).keys()]}
                renderItem={({ item: index }) => {
                    const col = Math.floor(index / BOARD_SIZE);
                    const row = index % BOARD_SIZE;
                    const color = (row + col) % 2 === 0 ? '#eeeed2' : '#769656';
                    return (
                        <View
                            key={index.toString()}
                            sx={{
                                width: size / BOARD_SIZE,
                                height: size / BOARD_SIZE,
                                backgroundColor: color,
                            }}
                        />
                    );
                }}
            />
        </View>
    );
};

export default EmptyBoard;
