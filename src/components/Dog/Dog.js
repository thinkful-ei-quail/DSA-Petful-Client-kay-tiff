
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

    confirmation = () => {
        window.confirm("Are you sure?")
    }

    adoptDog = (e) => {
        this.confirmation()
        // e.preventDefault()
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
    }
    
    toggleAdoptBtn = (dog) => {
        if (this.context.userName === this.context.queue[0]){
            return (
                <div className='btn'><button onClick={(e) => this.context.handleAdoptDog(e)}>Adopt {dog.name}</button></div>
            )
        }
    }

    doubleCheck = () => {
        if (this.adoptDog()) {
            return (
                <div className='Adopt'>
                <h2> Are you sure?</h2>
                <button>Yes</button>
                <button>No</button>
                </div>
            )
        }
    }
    render() {
        const {dog =[] } = this.context;
        return(
            <div className='main-dog'>
               <img className='img' src={dog.imageURL} alt='dog photo'/>
               <p>Name: {dog.name}</p>
               <p>Gender: {dog.gender}</p>
               <p>Age: {dog.age}</p>
               <p>Breed: {dog.breed}</p>
               <p>{dog.name}'s Story: {dog.story}</p>
               {this.toggleAdoptBtn(dog)}
            </div>
        );
    }
}

export default Dog
