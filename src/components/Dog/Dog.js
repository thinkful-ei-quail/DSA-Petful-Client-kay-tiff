
import React, { Component } from 'react'
import ApiContext from '../../ApiContext';
import './Dog.css';
//import  from '../';

class Dog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        };
    }

    static contextType = ApiContext;

    render() {
        const {dog =[] } = this.context;
        console.log('19',dog);

        return(
            <div className='main-dog'>
               <button>adopt a dog</button>
               <img className='img' src={dog.imageURL} alt='my headshot'/>
               <p>Name: {dog.name}</p>
               <p>Gender: {dog.gender}</p>
               <p>Age: {dog.age}</p>
               <p>Breed: {dog.breed}</p>
               <p>{dog.name}'s story: {dog.story}</p>
            </div>
        );
    }
}

export default Dog
