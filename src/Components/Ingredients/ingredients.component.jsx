import React from 'react';

export const Ingredients = ({ingredients}) => (
    <div className="ingredients">
        <div className="container">
            <h2>Ingredients</h2>
            <ul>
                {
                    ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                    ))
                }
            </ul>
        </div>
    </div>
)