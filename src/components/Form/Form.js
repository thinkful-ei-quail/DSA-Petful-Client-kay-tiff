import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    };
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
            });
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
            }).then((res) => {
                return res.json();
            }).then(() => {
               return this.context.enqueue(this.state.name.value);
            }).catch((error) => {
                this.setState({
                    isError: true,
                    errorMsg: error.message
                });
            });
                return this.context.runDemo(this.state.name.value);
        };
    };
    updateName = (name) => {
        this.setState({ name: { value: name } });
    };
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }; 
        const { className, ...otherProps } = this.props;
        this.history = otherProps.history;
        return (    
            <div className='form'>
                <h2>Sign Up</h2>
                <div className='center'>
                <form onSubmit={(e) => this.submitPerson(e)}>
                    <label className='form-row'>
                        Name:
                        <input
                            key='user'
                            type='text'
                            name='name'
                            placeholder='Joni Mitchel'
                            onChange={(e) => this.updateName(e.target.value)}
                            />
                    </label>
                    <div className='form-row'><input type="submit" name="submit" className="submit" /></div>
                </form>
                </div>
            </div>
        );
    };
};
export default Form;
