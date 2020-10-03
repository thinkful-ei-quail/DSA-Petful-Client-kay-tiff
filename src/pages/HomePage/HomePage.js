import React, { Component } from 'react'

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
        const displayForm = () => {
            if (this.state.isAdding){
                return <Form/>
            } else {
                return <Queue/>
            }
        }

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

        return(
            <div className='container'>
              <Header/>
              <div className= 'column'>
                {displayCat()}
                {displayDog()}
                <button>GET IN LINE</button>
              </div>
              <div className= 'column'>
                  {displayForm()} 
              </div>


              <Adopt/>
            </div>
        );
    }
}

export default HomePage