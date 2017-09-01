import React from 'react';
import { View , Text} from 'react-native';

export default class Chess extends React.Component {

	render() {
		return (
			<View style={{ flex:1, backgroundColor:'#000', alignItems: 'center' }}>
				<Text style={{ color:'#fff' }}>
					Chess
				</Text>
			</View>
		);
	}
}