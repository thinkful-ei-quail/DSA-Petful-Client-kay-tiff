import React, { Component } from 'react'
import ApiContext from '../../ApiContext';
import './Queue.css';

class Queue extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        };
    }

    static contextType = ApiContext

    render() {
        const { queue = [] } = this.context
        return(
            <div className='queue-container'>
               <h1>Adopters in line:</h1>
                <ul>        
                {queue.map((person, i) => 
                <li className='person' key={i}>
                    <p>{person}</p>
                </li>
                )}
               </ul>

            </div>
        );
    }
}

export default Queue