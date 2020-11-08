import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import {Link} from 'react-router-dom';
import ApiContext from '../../ApiContext';
import demo from '../../images/demo.jpg';

class About extends Component {
    static contextType = ApiContext;
    render() {
        return(
            <div>
               <Header/>
               <img src={demo} alt='an orange cat'/>
               <p className='about'>FIFO Adoptions is an adoption agency that encourages equity by adopting out cats and dogs by the length of time they've spent here. 
                   Each pet is adopted on a first-come, first-serve basis. To adopt a pet, you must get in line by adding your name to
                    the adoptee list, and then once it's your turn to adopt, the oldest pet at that time is who you take home!</p>
                <Link to= '/home'>
                    <button>Start</button>
                </Link>
            </div>
        );
    };
};

export default About;