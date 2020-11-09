
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
    };
    static contextType = ApiContext;
    confirmAdopt = (e) => {
        let confirmed = window.confirm("Are you sure?");
        if (confirmed){
            return this.handleAdoptDog(e);
        };
    };
    handleAdoptDog = (e) => {
        e.preventDefault();
        fetch(`${config.API_ENDPOINT}pets/dog`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({type: 'dog'}),
        }).then(() => {
            fetch(`${config.API_ENDPOINT}pets/dog`)
        });
        
        e.preventDefault();
        fetch(`${config.API_ENDPOINT}people`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(),
        })
        .then(() => {
            window.location.reload()
        });
        return true;
    };
    toggleAdoptBtn = (dog) => {
        if (this.context.isFirst){
            return (<button onClick={(e)=>this.confirmAdopt(e)}>Adopt {dog.name}</button>
            );
        };
    };
    render() {
        const {dog =[] } = this.context;
        return(
            <div className='dog'>
               <img className='img' src={dog.imageURL} alt='dog'/>
               <p>Name: {dog.name}</p>
               <p>Gender: {dog.gender}</p>
               <p>Age: {dog.age}</p>
               <p>Breed: {dog.breed}</p>
               <p>{dog.name}'s Story: {dog.story}</p>
               {this.toggleAdoptBtn(dog)}
            </div>
        );
    };
};
export default Dog;
