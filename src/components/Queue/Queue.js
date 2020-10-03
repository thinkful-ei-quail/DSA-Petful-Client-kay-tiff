import React, { Component } from 'react'
import ApiContext from '../../ApiContext';

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
               {queue.map((person, i) => 
                <li className='person' key={i}>
                    <p>{person}</p>
                </li>
                )}
            </div>
        );
    }
}

export default Queue