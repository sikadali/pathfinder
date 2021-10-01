import React from 'react';
import './Node.scss';

export const Node = (props) => {
	const { row, col, isEnd, isStart, isWall} = props;
	const nodeStateClass = isWall ? 'wall' : isStart ? 'start' : isEnd ? 'end' : '';

	return (
		<div
			id={`node-${row}-${col}`}
			className={`node ${nodeStateClass}`}
			onContextMenu={props.onContextMenu}
			onClick={props.onClick}
		/>
	);
};
