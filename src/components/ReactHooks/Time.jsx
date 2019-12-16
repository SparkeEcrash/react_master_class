import React from 'react';
import {Consumer} from './Restated';

const Time = () => {
	return (
		<Consumer>
			{(context) => {
				console.log(context)
				return(
				<span className="time">{context.state.time.toString()}</span>
	)}}

		</Consumer>
	)
}

export default Time;