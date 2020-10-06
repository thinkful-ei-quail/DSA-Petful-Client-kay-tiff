
import React, { Component } from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config';

class Dog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: {
                value: "",
            },
            isError: false,
            errorMsg: "",
            redirect: null,
        };
    }

    static contextType = ApiContext;

    adoptDog = (e) => {
        e.preventDefault()
        fetch(`${config.API_ENDPOINT}pets/dog`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({type: 'dog'}),
        })
            .then(() => {
                fetch(`${config.API_ENDPOINT}pets/dog`)
            })
        e.preventDefault()
        fetch(`${config.API_ENDPOINT}people`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then(() => {
                window.location.reload()
            })
    }

    render() {
        const {dog =[] } = this.context;
        return(
            <div className='main-dog'>
               <div className='btn'><button onClick={(e) => this.adoptDog(e)}>Adopt {dog.name}</button></div>
               <img className='img' src={dog.imageURL} alt='my headshot'/>
               <p>Name: {dog.name}</p>
               <p>Gender: {dog.gender}</p>
               <p>Age: {dog.age}</p>
               <p>Breed: {dog.breed}</p>
               <p>{dog.name}'s Story: {dog.story}</p>
            </div>
        );
    }
}

export default Dog
