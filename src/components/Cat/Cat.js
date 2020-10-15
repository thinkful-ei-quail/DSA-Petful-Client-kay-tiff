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

    toggleAdoptBtn = (cat) => {
        if (this.context.userName === this.context.queue[0]){
            return (
                <div className='btn'><button onClick={(e) => this.context.handleAdoptCat(e)}>Adopt {cat.name}</button></div>
            )
        }
    }

    render() {
     
        const {cat =[],  } = this.context;

        return(
            <div className='main-cat'>
               <img src={cat.imageURL} alt='cat photo'/>
               <p>Name: {cat.name}</p>
               <p>Gender: {cat.gender}</p>
               <p>Age: {cat.age}</p>
               <p>Breed: {cat.breed}</p>
               <p>{cat.name}'s Story: {cat.story}</p>
               {this.toggleAdoptBtn(cat)}
            </div>
        );
    }
}

export default Cat