import React, { Component } from 'react'
import './Header.css';
import {Link} from 'react-router-dom';

class Header extends Component {


    render() {
        return(
            <div className='header'>
                <Link to= '/'>
                    <h1>FIFO adoptions</h1>
                </Link>
               
            </div>
        );
    }
}

export default Header