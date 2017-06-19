import React from 'react';

import './Log.css';

const Log = (props) => {

	let {objective, duration, startTime, description} = props.log;

	let date = new Date(startTime);

	return (
		<div className="log">
			<p>{ objective }</p>
			<p>{ description }</p>
			<p>{ (duration / 60000).toFixed(2) } Minutes</p>
			<p>{ date.toString() }</p>
		</div>
	);
}

export default Log;
