import React, { Component } from 'react'

import './App.css';

import {Route} from 'react-router-dom';

import ApiContext from "../ApiContext";
import config from "../config";
import About from "../pages/About/About";
import HomePage from "../pages/HomePage/HomePage";


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pets:[],
            dog: [],
            cat: [],
            queue: [],
            isAdding: false,
            inLine: false,
            isFirst: false,
            adoptCat : false,
            adoptDog : false,
        };
    }
 
    componentDidMount() {

        fetch(`${config.API_ENDPOINT}pets`)//all pets
        .then(response => response.json())
        .then((pets) => {
          this.setState({pets });
        })
        .catch((error) => {
          console.error(error.message );
        });

        fetch(`${config.API_ENDPOINT}pets/cat`)//first cat
        .then(response => response.json())
        .then((cat) => {
          this.setState({cat });
        })
        .catch((error) => {
          console.error(error.message );
        });

        fetch(`${config.API_ENDPOINT}pets/dog`)//first dog
        .then(response => response.json())
        .then((dog) => {
          this.setState({dog });
        })
        .catch((error) => {
          console.error(error.message );
        });

        fetch(`${config.API_ENDPOINT}people`)// people queue
        .then(response => response.json())
        .then((queue) => {
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
                    component= {About}
                />
                <Route
                    path = '/home'
                    component = {HomePage}
                />

            </>
        )
    }
    splitName(name){
        
        let result= name;
        for (let i= 0; i <name.length; i++){
            if (name[i] === ' '){
                result = (name.slice(0,i))
                return result
            }
        }
        return result
    }

    onClickJoin = () => {
        if (this.state.inLine){
            alert( 'You are already in line!')
        }else{
        this.setState({ isAdding : true})
        }
    }

    onClickSubmit = () => {
        this.setState({ isAdding : false, inLine: true})
    }

    enqueue = () => {
        fetch(`${config.API_ENDPOINT}people`)
        .then((res) => res.json())
        .then((queue) => {
          this.setState({
            queue,
          });
        })
        .catch((e) => {
          console.log("Error loading queue data");
        });
    }

    displayOptions = () => {
        if (sessionStorage.person === this.context.queue[0]){
            this.setState({ isFirst : true })
        }
    }

    render() {
        const value = {
            pets: this.state.pets,
            dog: this.state.dog,
            cat: this.state.cat,
            queue: this.state.queue,
            isAdding: this.state.isAdding,
            inLine: this.state.inLine,
            isFirst: this.state.isFirst,
            adoptCat: this.state.adoptCat,
            adoptDog: this.state.adoptDog,
            userName: this.state.userName,
            enqueue: this.enqueue,
            splitName: this.splitName,
            onClickJoin: this.onClickJoin,
            onClickSubmit: this.onClickSubmit,
            refreshPage: this.refreshPage,
        }

        return(
            <ApiContext.Provider value={value}>
                {this.renderRoutes()}
            </ApiContext.Provider>

        );
    }
}

export default App