import React, { Component } from 'react'
import Header from '../../components/Header/Header';
import {Link} from 'react-router-dom';
import './About.css'
class About extends Component {
    render() {
        return(
            <div className='container'>
               <Header/>
               <p>Petful is an adoption agency that encourages equity by adopting out cats and dogs by the length of time 
                   they've spent here. Each pet is adopted out on a first come first serve basis. To adopt a pet you must 'get in line' 
                   by signing up on our adoptee list, and then once its your turn to adopt, the oldest pet at that time is who you take 
                   home!</p>
                <p style={{textAlign:'center'}}>Happy Adopting!!</p>
                <Link to= '/home'>
                    <div className='btn'><button>Start</button></div>
                </Link>
            </div>
        );
    }
}

export default About