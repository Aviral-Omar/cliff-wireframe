import React, { useEffect } from 'react';

const Metrics = props => {
	const { setTitle } = props;

	useEffect(() => setTitle('Metrics'));

	return <div />;
};

export default Metrics;
