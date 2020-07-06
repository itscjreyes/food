import React from 'react';
import {Link} from 'react-router-dom';
import 'lazysizes';

const Result = props => {
    const styles = {
        backgroundImage: `url('${props.image}')`
    }

    return (
        <Link to={props.slug} className="result">
            <div className="img-wrapper">
                <img src={props.image} alt={props.title} className="lazyload"/>
            </div>
            <div className="content-wrapper">
                <h3>{props.title}</h3>
            </div>
        </Link>
    )
}

export default Result;