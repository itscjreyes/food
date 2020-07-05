import React from 'react';

export const Steps = ({steps}) => (
    <div className="steps">
        <div className="container">
            <h2>Steps</h2>
            <ul>
                {
                    steps.map((step, i) => (
                        <li key={i}>{step}</li>
                    ))
                }
            </ul>
        </div>
    </div>
)