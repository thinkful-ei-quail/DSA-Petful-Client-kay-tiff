import React, { Component } from 'react'

import './App.css';

import {Route} from 'react-router-dom';

import ApiContext from "../ApiContext";
import config from "../config";
import IntroPage from "../pages/IntroPage/IntroPage";
import HomePage from "../pages/HomePage/HomePage";

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pets:[],
            dog: [],
            cat: [],
            people: [],

        };
    }

   
    componentDidMount() {

        fetch(`${config.API_ENDPOINT}pets`)//all pets
        .then(response => response.json())
        .then((pets) => {
          console.log('pets', pets)
          this.setState({pets });
        })
        .catch((error) => {
          console.error(error.message );
        });

        fetch(`${config.API_ENDPOINT}pets/cat`)//first cat
        .then(response => response.json())
        .then((cat) => {
          console.log('cat', cat)
          this.setState({cat });
        })
        .catch((error) => {
          console.error(error.message );
        });

        fetch(`${config.API_ENDPOINT}pets/dog`)//first dog
        .then(response => response.json())
        .then((dog) => {
          console.log('dog', dog)
          this.setState({dog });
        })
        .catch((error) => {
          console.error(error.message );
        });

        fetch(`${config.API_ENDPOINT}people`)// people queue
        .then(response => response.json())
        .then((queue) => {
          console.log('queue', queue)
          this.setState({queue});
        })
        .catch((error) => {
          console.error(error.message );
        });
    }

    renderRoutes(){
        return(
            <>
                <Route
                    exact path = '/'
                    component= {IntroPage}
                />
                <Route
                    path = '/home'
                    component = {HomePage}
                />

            </>
        )
    }

    // handleDeleteingredient = (pet_id) => {
    //     this.setState({
    //       pets: this.state.pets.filter((pet) => pet.pet_id !== pet_id),
    //     });
    //   };
    render() {
        const value = {
            pets: this.state.pets,
            dog: this.state.dog,
            cat: this.state.cat,
            queue: this.state.queue,
        }

        return(
            <ApiContext.Provider value={value}>
                {this.renderRoutes()}
            </ApiContext.Provider>

        );
    }
}

export default App