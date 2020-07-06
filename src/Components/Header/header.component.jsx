import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/logo.svg';

const Header = () => (
    <header>
        <div className="container">
            <div className="logo-wrapper">
                <Link to="/"><img src={Logo} alt="FOOD x mac &amp; ceej"/></Link>
            </div>
        </div>
    </header>
)

export default Header;