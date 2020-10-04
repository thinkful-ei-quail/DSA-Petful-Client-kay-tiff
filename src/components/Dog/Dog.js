
import React, { Component } from 'react'
import ApiContext from '../../ApiContext';

class Dog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        };
    }

    static contextType = ApiContext;

    render() {
        const {dog =[] } = this.context;
        return(
            <div className='main-dog'>
               <div className='btn'><button>Adopt A Dog</button></div>
               <img className='img' src={dog.imageURL} alt='my headshot'/>
               <p>Name: {dog.name}</p>
               <p>Gender: {dog.gender}</p>
               <p>Age: {dog.age}</p>
               <p>Breed: {dog.breed}</p>
               <p>{this.context.splitName(`${dog.name}`)}'s story: {dog.story}</p>
            </div>
        );
    }
}

export default Dog
