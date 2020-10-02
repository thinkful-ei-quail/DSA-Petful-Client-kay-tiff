import React, { Component } from 'react'

import './App.css';

import {Route} from 'react-router-dom';

import config from "../config";

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dog: [],
            cat: [],
            people: [],
        };
    }

    dogComponentDidMount() {//first dog
        fetch(`${config.API_ENDPOINT}/pets/dog`)
    
        .then(response => response.json())
        .then((dog) => {
          console.log('dog', dog)
          this.setState({dog });
        })
        .catch((error) => {
          console.error(error.message );
        });
    }
    catComponentDidMount() {//first cat
        fetch(`${config.API_ENDPOINT}/pets/cat`)
    
        .then(response => response.json())
        .then((cat) => {
          console.log('cat', cat)
          this.setState({cat });
        })
        .catch((error) => {
          console.error(error.message );
        });
      }
    queueComponentDidMount() {// people queue
        fetch(`${config.API_ENDPOINT}/people`)
    
        .then(response => response.json())
        .then((queue) => {
          console.log('queue', queue)
          this.setState({queue});
        })
        .catch((error) => {
          console.error(error.message );
        });
    }
    


    render() {
        return(
            <div className='container'>
               
            </div>
        );
    }
}

export default App