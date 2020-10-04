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
        const name = this.state.name.value;
        if(!name || name.length < 1 || name === ' '){
            this.setState({
                isError: true,
                errorMsg: "Please submit a valid name.",
            })
            return false;
        }
        this.context.onClickSubmit();
        return true;
    };
    
    // fetch(`${config.API_ENDPOINT}people`)// people queue
    // .then(response => response.json())
    // .then((queue) => {
    //   console.log('queue', queue)
    //   this.setState({queue});
    // })
    // .catch((error) => {
    //   console.error(error.message );
    // });

    submitPerson = (e) => {
        e.preventDefault();
        this.setState({isError: false, errorMsg: ""});

        if (this.validatePerson()) {

            this.context.updateUserName(this.state.name);
            fetch(`${config.API_ENDPOINT}people`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    person: `${this.state.name.value}`,
                }),
            })
            .then((res)=> { 
                return res.json();
            })
            .then((response)=>{
                
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
        console.log(this.context)
    }

    updateName = (name) => {
        this.setState({ name: { value: name }})
    }

    render() {
        
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        const { className, ...otherProps } = this.props;
        this.history = otherProps.history;

        return(
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
                   <div className='form-row'><input type="submit" name="submit"/></div>
                </form>
            </div>
        );
    }
}

export default Form