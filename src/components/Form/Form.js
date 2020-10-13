import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Form.css'

import config from '../../config';
import ApiContext from '../../ApiContext';

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
            //this.runDemo();
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
                this.context.enqueue(this.state.name.value);
                })
            .catch((error) => {
                this.setState({
                    isError: true,
                    errorMsg: error.message
                })
            })
        }
        //look at this
        console.log(this.context)
    }

    updateName = (name) => {
        this.setState({ name: { value: name } })
    }

    timerFunc = () => {
        setInterval(this.runDemo, 5000)
    }

    runDemo = () => {
        let adoptees = ['Dolly Parton', 'Lucy Ball', 'Jenny From The Block', 'Samantha Adams', 'Chartreuse Brown', 'Michael Phelps', 'Christian Dior', 'Coco Chanel', 'Shay Evans', 'Mr.PotatoHead']
        let timerFunc = setInterval(() => {
        fetch(`${config.API_ENDPOINT}people`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                person: adoptees[Math.floor((Math.random() * 10))],
            }),
        })
        
        .then(() => {
            fetch(`${config.API_ENDPOINT}people`)
        })
        if (this.context.queue.length ===   5) {
            clearInterval(timerFunc)
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