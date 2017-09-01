import React from 'react';
import { View , Image } from 'react-native';
import PropTypes from 'prop-types';

import PieceImages from '../images/pieces';

export default class Cell extends React.Component {

	static propTypes = {
		size: PropTypes.number.isRequired,
		rowIndex: PropTypes.number.isRequired,
		columnIndex: PropTypes.number.isRequired,
		piece: PropTypes.string,
	};

	render() {

		const {
			size,
			rowIndex,
			columnIndex,
			piece,
		} = this.props;

		const isBlack = (rowIndex + columnIndex) % 2 === 0;
		let backgroundColor = isBlack ? '#F0D9B5' : '#B58863';

		let pieceView = null;
		if(piece) {
			pieceView = <Image source={PieceImages[piece]} style={{ width:size , height:size }} />
		}

		return (
			<View style={{ backgroundColor, width: size, height: size }}>
				{ pieceView }
			</View>
		);
	}
}