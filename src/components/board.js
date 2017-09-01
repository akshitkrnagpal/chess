import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import chessRules from 'chess-rules';

import Cell from './cell';

export default class Board extends React.Component {

	static propTypes = {
		size: PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			position: chessRules.getInitialPosition(),
		};
	}

	renderCells() {

		const {
			size,
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

			if(!rowViews[rowIndex]) {
				rowViews[rowIndex]=[];
			}

			let piece = null;
			if(cell) {
				piece = cell.side.concat(cell.type);
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

		const boardView = rowViews.map( (row,index) => {
			return (
				<View key={index} style={{ flexDirection:'row' }}>
					{ row }
				</View>
			);
		});

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