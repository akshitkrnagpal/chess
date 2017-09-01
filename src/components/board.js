import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import chessRules from 'chess-rules';

import Cell from './cell';

export default class Board extends React.Component {

	static propTypes = {
		size: PropTypes.number.isRequired,
		color: PropTypes.oneOf(['W','B']),
	};

	static defaultProps = {
		color: 'W',
	}

	constructor(props) {
		super(props);

		this.state = {
			position: chessRules.getInitialPosition(),
		};
	}

	renderCells() {

		const {
			size,
			color,
		} = this.props;

		const {
			position
		} = this.state;

		const board = position.board;
		const rowViews = [];

		const cellSize = size/8;

		board.forEach( (cell , index) => {

			const rowIndex = Math.floor(index/8);
			const columnIndex = index%8;

			let piece = null;
			if(cell) {
				piece = cell.side.concat(cell.type);
			}

			if(!rowViews[rowIndex]) {
				rowViews[rowIndex]=[];
			}
			rowViews[rowIndex].push(
				<Cell
					key={index}
					size={cellSize}
					rowIndex={rowIndex}
					columnIndex={columnIndex}
					piece={piece}
				/>
			);

		});

		let boardView = rowViews.map( (row,index) => {
			return (
				<View key={index} style={{ flexDirection:'row' }}>
					{ row }
				</View>
			);
		});

		if(color === 'W'){
			boardView.reverse();
		}

		return boardView;
	}

	render() {

		return (
			<View style={{ flexDirection:'column' }}>
				{ this.renderCells() }
			</View>
		);
	}
}