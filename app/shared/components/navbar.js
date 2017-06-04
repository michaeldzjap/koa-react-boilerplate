import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navigation">
                <div className="container">
                    <Link className="navigation-title" to="/">
                        <img className="img" src="http://placehold.it/200x100" height="30" alt="Brand" title="Brand" />
                        {' '}
                        <h1 className="title">Koa-React</h1>
                    </Link>
                    <ul className="navigation-list float-right">
                        <li className="navigation-item">
                            <Link className="navigation-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
