import React from 'react';
import { View , Text , Dimensions } from 'react-native';

import Board from './components/board';

export default class Chess extends React.Component {

	render() {

		const {
			width,
			height,
		} = Dimensions.get('window');

		const size = Math.min(width,height);

		return (
			<Board size={size} />
		);
	}
}