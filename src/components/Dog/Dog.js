
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

    
    toggleAdoptBtn = (dog) => {
        if (this.context.userName === this.context.queue[0]){
            return (
                <div className='btn'><button onClick={(e) => this.context.handleAdoptDog(e)}>Adopt {dog.name}</button></div>
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
