import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

export default class Cell extends React.Component {

	static propTypes = {
		size: PropTypes.number.isRequired,
		rowIndex: PropTypes.number.isRequired,
		columnIndex: PropTypes.number.isRequired,
	};

	render() {

		const {
			size,
			rowIndex,
			columnIndex,
		} = this.props;

		const isBlack = (rowIndex + columnIndex) % 2 === 0;
		let backgroundColor = isBlack ? '#F0D9B5' : '#B58863';
		return (
			<View style={{ backgroundColor, width: size, height: size }} />
		);
	}
}