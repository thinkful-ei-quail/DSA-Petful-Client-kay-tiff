import React, { Component } from 'react';
import Cat from '../../components/Cat/Cat';
import Dog from '../../components/Dog/Dog';
import Queue from '../../components/Queue/Queue';
import Form from '../../components/Form/Form';
import ApiContext from '../../ApiContext';

class HomePage extends Component {
    static contextType = ApiContext;
    render() {
        const displayForm = () => {
            if (this.context.isAdding){
                return (
                    <Form/>
                );
            } else {
                return <Queue/>
            };
        };
        const displayBtn = () => {
            if (!this.context.inLine){
                return(
                    <button onClick={this.context.onClickJoin}>Sign Up</button>
                );
            };
            return (
                <h2>Please wait for your turn to adopt.</h2>
            );
        };
        return(
            <div className='home'>
                {displayBtn()}
                {displayForm()} 
                <div className='pets'>
                    <hr />
                    <Cat/>
                    <hr />
                    <Dog/>
                    <hr />
                </div>
            </div>
        );
    };
};

export default HomePage;