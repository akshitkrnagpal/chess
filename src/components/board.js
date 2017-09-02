import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import chessRules from 'chess-rules';

import Cell from './cell';

export default class Board extends React.Component {

	static propTypes = {
		size: PropTypes.number.isRequired,
		currentPlayer: PropTypes.oneOf(['W','B']),
	};

	static defaultProps = {
		currentPlayer: 'W',
	}

	handleClick (index) {

		const {
			position,
			selectedIndex,
			isSelectable,
			canMoveHereArray,
		} = this.state;
		
		if(isSelectable.includes(index)) {
			this.setState({
				selectedIndex: index,
				canMoveHereArray: [],
			});
		}

		if(canMoveHereArray.includes(index)) {
			const move = { src: selectedIndex , dst: index };
			updatedPosition = chessRules.applyMove(position,move);
			this.setState({
				selectedIndex: null,
				position: updatedPosition,
				isSelectable: [],
				canMoveHereArray: [],
			});
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			position: chessRules.getInitialPosition(),
			selectedIndex: null,
			isSelectable: [],
			canMoveHereArray: [],
		};
	}

	renderCells() {

		const {
			size,
			currentPlayer,
		} = this.props;

		const {
			position,
			selectedIndex,
			isSelectable,
			canMoveHereArray,
		} = this.state;

		const board = position.board;
		const rowViews = [];

		const cellSize = size/8;

		const availableMoves = chessRules.getAvailableMoves(position);

		availableMoves.forEach( function (move) {
			if(move.src === selectedIndex) {
				canMoveHereArray.push(move.dst);
			}
			if(!isSelectable.includes(move.src)) {
				isSelectable.push(move.src);
			}
		});

		board.forEach( (cell , index) => {

			const rowIndex = Math.floor(index/8);
			const columnIndex = index%8;

			let piece = null;
			if(cell) {
				piece = cell.side.concat(cell.type);
			}

			let selected = false;
			if(selectedIndex === index) {
				selected = true
			}

			let canMoveHere = false;
			if( canMoveHereArray.includes(index) ) {
				canMoveHere = true;
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
					selected={selected}
					canMoveHere={canMoveHere}
					handleClick={this.handleClick.bind(this,index)}
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

		if(currentPlayer === 'W'){
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
