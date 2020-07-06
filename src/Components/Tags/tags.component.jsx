import React from 'react';

export const Tags = ({tags, handleRemove}) => (
    <div className="tags">
        <div className="container">
            <h2>Tags</h2>
            <ul>
                {
                    tags.map((tag, i) => (
                        <li 
                            key={i}
                            onClick={handleRemove}
                            data-value={tag.toLowerCase().replace(' ','-')}
                        >{tag}</li>
                    ))
                }
            </ul>
        </div>
    </div>
)