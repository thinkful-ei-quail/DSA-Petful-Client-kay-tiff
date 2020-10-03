import React, { Component } from 'react'
import './HomePage.css'

import Header from '../../components/Header/Header';
import Cat from '../../components/Cat/Cat';
import Dog from '../../components/Dog/Dog';
import Queue from '../../components/Queue/Queue';
import Form from '../../components/Form/Form';
import Adopt from '../../components/Adopt/Adopt';
import ApiContext from '../../ApiContext';

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {


        };
    }
    static contextType = ApiContext;
    render() {
        const displayCat = () => {
            if (this.context.adoptCat){
                return <Adopt/>
            } else {
                return <Cat/>
            }
        }
        const displayDog = () => {
            if (this.context.adoptDog){
                return <Adopt/>
            } else {
                return <Dog/>
            }
        }
        const displayForm = () => {
            if (this.context.isAdding){
                return (
                    <Form/>
                )
            } else {
                return <Queue/>
            }
        }

        return(
            <div className='home'>
              <Header/>
              <div className= 'cat-column'>
                {displayCat()}
              </div>
              <div className= 'dog-column'>
                {displayDog()}
              </div>
                <div className='btn'>
                <button onClick={this.context.onClickJoin}>Sign Up & Adopt!</button>
                </div>
              <div className= 'queue'>
                  {displayForm()} 
              </div>
            </div>
        );
    }
}

export default HomePage