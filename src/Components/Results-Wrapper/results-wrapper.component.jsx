import React from 'react';
import Result from '../Result/result.component';

const ResultsWrapper = props => {
    if (props.data.length === 0) {
        return (
            <div className="results-wrapper">
                <div className="container">
                    <p className="no-results">Sorry, there are no results. Please try again.</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="results-wrapper">
                <div className="container">
                    {
                        props.data.map((item, i) => (
                            <Result 
                                key={i}
                                title={item.title}
                                slug={item.slug}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default ResultsWrapper;