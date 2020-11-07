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
            .then(() =>{
                this.runDemo();
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
    runDemo = (i,l) => { setTimeout(() => {  

        console.log('iteration',i,'length',l)
        if (!l){
            i = 0
            l = this.context.queue.length
            this.context.onClickSubmit()
            return this.runDemo(i,l)
        }
        if (this.state.name.value === this.context.queue[i] && l === 5){
            clearTimeout(this.runDemo)
            return window.location.reload()
        } 
        if (this.state.name.value !== this.context.queue[i] && l > 1 ){
            i++
            l--
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
               return this.runDemo(i,l)
            })
    
        }
        if ( l < 5 && this.state.name.value === this.context.queue[i] ){
            l++
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
            }).then(()=>{
            return this.runDemo(i,l)
            })
        }else{
            console.log(this.context.queue[i])
        }
    }, 5000)}
    
    

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        
        const { className, ...otherProps } = this.props;
        this.history = otherProps.history;

        return (
            
            <div className='form'>
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
