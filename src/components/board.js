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

			rowViews[rowIndex].push(
				<Cell
					key={index}
					size={cellSize}
					rowIndex={rowIndex}
					columnIndex={columnIndex}
				/>
			);

		});

		const boardView = rowViews.map( (row,index) => {
			return (
				<View key={index} style={{ flexDirection:'column' }}>
					{ row }
				</View>
			);
		});

		console.log(boardView);

		return boardView;
	}

	render() {

		return (
			<View style={{ flexDirection:'row' }}>
				{ this.renderCells() }
			</View>
		);
	}
}