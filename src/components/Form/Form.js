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
<<<<<<< HEAD
        const name = this.state.name;
=======
        const name = this.state.name.value;
>>>>>>> 132bc647807df0b3f75d1278df7d7db94f4e2a6e
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
<<<<<<< HEAD
            //this.runDemo();
=======
            //look at this
>>>>>>> 132bc647807df0b3f75d1278df7d7db94f4e2a6e
            fetch(`${config.API_ENDPOINT}people`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    person: `${this.state.name.value}`,
                }),
            })
<<<<<<< HEAD
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
=======
                .then((res) => {
                    return res.json();
                })
                .then(() => {
                    this.context.enqueue();
                    sessionStorage.setItem('person', `${this.state.name.value}`);
                })
                .catch((error) => {
                    this.setState({
                        isError: true,
                        errorMsg: error.message
                    })
>>>>>>> 132bc647807df0b3f75d1278df7d7db94f4e2a6e
                })
        }
        //look at this
        console.log(this.context)
    }

    updateName = (name) => {
        this.setState({ name: { value: name } })
<<<<<<< HEAD
    }

    timerFunc = () => {
        setInterval(this.runDemo, 5000)
    }

    runDemo = () => {
=======
    }

    timerFunc = () => {
        setInterval(this.addNameToQueue, 5000)
    }

    addNameToQueue = () => {
        // if submit button on form is clicked
>>>>>>> 132bc647807df0b3f75d1278df7d7db94f4e2a6e
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
<<<<<<< HEAD
        
        .then(() => {
            fetch(`${config.API_ENDPOINT}people`)
        })
        if (this.context.queue.length ===   5) {
            clearInterval(timerFunc)
        }
    }, 5000)
}

    render() {
=======
            .then(() => {
                fetch(`${config.API_ENDPOINT}people`)
            })
            if (this.state.people.length === 5) {
                clearInterval(timerFunc)
            }
    }, 5000)
}


    render() {

>>>>>>> 132bc647807df0b3f75d1278df7d7db94f4e2a6e
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