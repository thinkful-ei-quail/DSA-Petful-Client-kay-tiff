import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Form.css'

import config from '../../config';
import ApiContext from '../../ApiContext';
import { render } from '@testing-library/react';

class Form extends Component {
    
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

    static defaultProps = {
        viewtype: false,
        match: {
            params: {},
        },
    };


    validatePerson = () => {
        const name = this.state.name;
        if (!name || name.length < 1 || name === ' ') {
            this.setState({
                isError: true,
                errorMsg: "Please submit a valid name.",
            })
            return false;
        }
        this.context.onClickSubmit();
        return true;
    };

    submitPerson = (e) => {
        e.preventDefault();
        this.setState({ isError: false, errorMsg: "" });

        if (this.validatePerson()) {
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
               return this.context.enqueue(this.state.name.value);
            })
            .then((event) =>{
                this.runDemo(event);
            })
            .catch((error) => {
                this.setState({
                    isError: true,
                    errorMsg: error.message
                })
            })
        }
    }
    
    updateName = (name) => {
        this.setState({ name: { value: name } })
    }
    
    
    runDemo = (event) => { setTimeout(() => {  
        if (this.state.name.value === this.context.queue[0] && this.context.queue.length === 5){
            console.log('yay!')
            clearTimeout(this.runDemo)
            return window.location.reload()
        } 
        if (this.state.name.value !== this.context.queue[0] && this.context.queue.length > 1 ){
            fetch(`${config.API_ENDPOINT}pets/dog`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({type: 'dog'}),
            })
            fetch(`${config.API_ENDPOINT}people`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(),
            }).then(() => {
                clearTimeout(this.runDemo)
            }).then(() => {
                this.runDemo(event)
            })
            return
        }
        if ( this.context.queue.length < 5 && this.state.name.value === this.context.queue[0] ){
            let adoptees = ['Dolly Parton', 'Lucy Ball', 'Jenny From The Block', 'Samantha Adams', 'Chartreuse Brown', 'Michael Phelps', 'Christian Dior', 'Coco Chanel', 'Shay Evans', 'Mr.PotatoHead']
            fetch(`${config.API_ENDPOINT}people`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    person: adoptees[Math.floor((Math.random() * 10))],
                }),
            }).then(() =>{
                fetch(`${config.API_ENDPOINT}people`)
            }).then(() => {
                clearTimeout(this.runDemo)
            })
            this.runDemo(event)
            return
        }
    }, 5000)
}

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        
        const { className, ...otherProps } = this.props;
        this.history = otherProps.history;

        return (
            
            <div className='form'>
                {/* {this.runDemo} */}
                <h1>Sign Up</h1>
                <form onSubmit={(e) => this.submitPerson(e)}>
                    <label className='form-row'>
                        Name:
                        <input
                            type='text'
                            name='name'
                            onChange={(e) => this.updateName(e.target.value)}
                            />
                    </label>
                    <div className='form-row'><input type="submit" name="submit" /></div>
                </form>
            </div>
        );
    }
}

export default Form
                        // }).then(()=> {
                        //     if (this.state.name.value !== this.context.queue[0]){
                        //         fetch(`${config.API_ENDPOINT}pets/dog`, {
                        //             method: "DELETE",
                        //             headers: {
                        //                 "Content-Type": "application/json",
                        //             },
                        //             body: JSON.stringify({type: 'dog'}),
                        //         })
                        //         fetch(`${config.API_ENDPOINT}people`, {
                        //             method: "DELETE",
                        //             headers: {
                        //                 "Content-Type": "application/json",
                        //             },
                        //             body: JSON.stringify(),
                        //         }).then(()=>{
                        //             if (this.context.queue.length < 5){
                        //                 fetch(`${config.API_ENDPOINT}people`, {
                        //                     method: "POST",
                        //                     headers: {
                        //                         "Content-Type": "application/json",
                        //                     },
                        //                     body: JSON.stringify({
                        //                         person: adoptees[Math.floor((Math.random() * 10))],
                        //                     }),
                        //                 }).then(() =>{
                        //                     fetch(`${config.API_ENDPOINT}people`)
                        //                 })
                        //             }
                        //         })
                        //     } 