import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


import config from '../../config';

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
        return true;
    };

    submitPerson = (e) => {
        e.preventDefault();
        this.setState({isError: false, errorMsg: ""});

        if (this.validatePerson()) {
            
            fetch(`${config.API_ENDPOINT}people`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: `${this.state.name.value}`,
                }),
            })
            .then((res)=> {
                return res.json();
            })
            .then((response)=>{
                this.context.enqueue();
                this.setState({
                    redirect: "home"
                })
            })
            .catch((error) => {
                this.setState({
                  isError: true,
                  errorMsg: error.message
                })
            })
        }
        console.log(this.state)
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
            <div className='container'>
               <h1>GET IN LINE</h1>
               <form onSubmit={(e) => this.submitPerson(e)}>
                   <label>
                        Name:
                        <input
                            type='text'
                            name='name'
                            onChange={(e) => this.updateName(e.target.value)}
                        />
                   </label>
                   <input type="submit" name="submit"/>
                </form>
            </div>
        );
    }
}

export default Form