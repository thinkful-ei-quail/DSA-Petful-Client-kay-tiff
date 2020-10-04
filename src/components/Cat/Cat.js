import React, { Component } from 'react'
import ApiContext from '../../ApiContext';
import config from '../../config';

class Cat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        };
    }
    static contextType = ApiContext;

    adoptCat = (e) => {
        e.preventDefault()
        this.setState({})
        fetch(`${config.API_ENDPOINT}pets/cat`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({type: 'cats'}),
        })
            .then(() => {
                fetch(`${config.API_ENDPOINT}pets/cat`)
            })
    }

    render() {
     
        const {cat =[],  } = this.context;

        return(
            <div className='main-cat'>
               <div className='btn'><button onClick={(e) => this.adoptCat(e)}>Adopt A Cat</button></div>
               <img src={cat.imageURL} alt='my headshot'/>
               <p>Name: {cat.name}</p>
               <p>Gender: {cat.gender}</p>
               <p>Age: {cat.age}</p>
               <p>Breed: {cat.breed}</p>
               <p>{this.context.splitName(`${cat.name}`)}'s story: {cat.story}</p>
            </div>
        );
    }
}

export default Cat