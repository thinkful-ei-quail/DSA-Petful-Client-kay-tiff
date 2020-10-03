import React, { Component } from 'react'

import Header from '../../components/Header/Header';
import Cat from '../../components/Cat/Cat';
import Dog from '../../components/Dog/Dog';

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        };
    }

    render() {
        return(
            <div className='container'>
              <Header/>
              <div className= 'pet-container'>
                <Cat/>
                <Dog/>
                <button>GET IN LINE</button>
              </div>

              <h2>Queue</h2>
              <h2>Form</h2>
              <h2>Adopt</h2>
            </div>
        );
    }
}

export default HomePage