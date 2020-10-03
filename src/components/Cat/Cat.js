import React, { Component } from 'react'
import ApiContext from '../../ApiContext';

class Cat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        };
    }

    static contextType = ApiContext;

    render() {
     
        const {cat =[],  } = this.context;
    

        console.log('19',cat);

        return(
            <div className='main-cat'>
               <div className='btn'><button>Adopt A Cat</button></div>
               <img src={cat.imageURL} alt='my headshot'/>
               <p>Name: {cat.name}</p>
               <p>Gender: {cat.gender}</p>
               <p>Age: {cat.age}</p>
               <p>Breed: {cat.breed}</p>
               <p>{cat.name}'s story: {cat.story}</p>
            </div>
        );
    }
}

export default Cat