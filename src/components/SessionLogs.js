import React from 'react';

import Log from './Log.js';

import './SessionLogs.css';

const SessionLogs = (props) => {

	let sessionLogDisplay = '';

	if (props.logs.length === 0) {
		sessionLogDisplay = <p>No entries found!</p>;
	} else {
		sessionLogDisplay = (<div className="sessionLogs">
				<div className="log log-headings">
					<p>Objective:</p>
					<p>Description</p>
					<p>Duration:</p>
					<p>Start Time:</p>
				</div>
				{ props.logs.map((item,key) => {
						return (
							<Log key={key} log={item} />
						);
					})
				}
			</div>);
	}
	return (
		<div className="sessionLogs-container">
			<h1 className="sessionLogs-header">Your Sessions:</h1>
			{sessionLogDisplay}
		</div>
	);
}

export default SessionLogs;
