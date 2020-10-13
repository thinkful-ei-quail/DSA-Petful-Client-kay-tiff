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

    toggleAdoptBtn = (cat) => {
        if (this.context.userName === this.context.queue[0]){
            return (
                <div className='btn'><button onClick={(e) => this.adoptCat(e)}>Adopt {cat.name}</button></div>
            )
        }
    }

    render() {
     
        const {cat =[],  } = this.context;

        return(
            <div className='main-cat'>
               <img src={cat.imageURL} alt='my headshot'/>
               <p>Name: {cat.name}</p>
               <p>Gender: {cat.gender}</p>
               <p>Age: {cat.age}</p>
               <p>Breed: {cat.breed}</p>
               <p>{this.context.splitName(`${cat.name}`)}'s Story: {cat.story}</p>
               {this.toggleAdoptBtn(cat)}
            </div>
        );
    }
}

export default Cat