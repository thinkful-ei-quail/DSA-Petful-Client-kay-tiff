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
        fetch(`${config.API_ENDPOINT}people`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                person: `${this.state.name.value}`,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then(() => {
                this.context.enqueue();
                this.setState({
                    redirect: "/home"
                })
            })
            .catch((error) => {
                this.setState({
                    isError: true,
                    errorMsg: error.message
                })
            })
    }

    render() {
     
        const {cat =[],  } = this.context;

        return(
            <div className='main-cat'>
               <div className='btn'><button onSubmit={(e) => this.adoptCat(e)}>Adopt A Cat</button></div>
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