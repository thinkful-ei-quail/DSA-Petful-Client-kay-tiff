import React, { Component } from 'react'
import './HomePage.css'

import Header from '../../components/Header/Header';
import Cat from '../../components/Cat/Cat';
import Dog from '../../components/Dog/Dog';
import Queue from '../../components/Queue/Queue';
import Form from '../../components/Form/Form';
import Adopt from '../../components/Adopt/Adopt';


class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAdding : false,
            adoptingCat : false,
            adoptingDog : false,

        };
    }

    render() {


        const displayCat = () => {
            if (this.state.adoptingCat){
                return <Adopt/>
            } else {
                return <Cat/>
            }
        }

        const displayDog = () => {
            if (this.state.adoptingDog){
                return <Adopt/>
            } else {
                return <Dog/>
            }
        }

        const toggleAddTrue = () => {
            this.setState({ isAdding : true})
        }

        const toggleAddFalse = () => {
            this.setState({ isAdding : false})
        }
        const displayForm = () => {
            if (this.state.isAdding){
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
                <button onClick={toggleAddTrue}>Sign Up & Adopt!</button>
                </div>
              <div className= 'queue'>
                  {displayForm()} 
              </div>
            </div>
        );
    }
}

export default HomePage