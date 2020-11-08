import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import {Link} from 'react-router-dom';
import './About.css';
import ApiContext from '../../ApiContext';
import demo from '../../images/demo.jpg';
class About extends Component {
    static contextType = ApiContext;
    render() {
        const displayImage = ()=>{
            if (this.context.pets[0]){
                return(
                    <img className='img' src={this.context.pets[0].imageURL} alt='pet'/>
                )
            }else{
                return(
                    <img className='img' src={demo} alt='pet'/>
                )
            }
        }
        return(
            <div className='container'>
               <Header/>
               {displayImage()}
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
    };
};

export default About;