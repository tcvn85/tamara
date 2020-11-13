import React from "react";
import './index.scss';

const Loading = () => {
	return (
			<div className="loading-page">
				<div className="spinner-border text-primary" role="status">
					  <span className="sr-only">Loading...</span>
				</div>
			</div>
		)
}

export default Loading;
