import React, { useEffect, useRef, useState } from 'react';

export const Item = ({ children, id, question }) => {
	const [expanded, toggleExpanded] = useState(false);

	const answerRef = useRef();

	useEffect(() => {
		if (expanded && answerRef.current) {
			answerRef.current.focus();
		}
	}, [answerRef, expanded]);

	return (
		<div className="accordion-item mb-4 rounded bg-transparent border-0 text-light">
	  	<h2
	  		className="accordion-header"
	  		id={`${id}Heading`}
	  	>
		    <button
	      	className="accordion-button rounded collapsed"
	      	type="button"
	      	data-bs-toggle="collapse"
	      	data-bs-target={`#${id}`}
	      	aria-expanded="false"
	      	aria-controls={id}
	      	onClick={() => toggleExpanded(!expanded)}
	      >
	      	{question}
	      </button>
      </h2>
	    <div
	    	id={id}
	    	className="accordion-collapse collapse"
	    	data-bs-parent="#FrequentlyAskedQuestions"
	    	aria-labelledby={`${id}Heading`}
	    >
	      <div
	      	className="accordion-body text-start"
	      	tabIndex="0"
	      	ref={answerRef}
	      >
	      	{children}
	      </div>
	    </div>
	  </div>
	);
};
