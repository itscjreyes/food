import React from 'react';
import {Link} from 'react-router-dom';

const Result = props => (
    <Link to={props.slug} className="result">
        <img src={props.image} alt={props.title}/>
        <h3>{props.title}</h3>
    </Link>
)

export default Result;