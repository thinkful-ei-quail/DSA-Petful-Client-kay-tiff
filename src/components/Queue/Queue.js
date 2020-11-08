import React, { Component } from 'react'
import ApiContext from '../../ApiContext';

class Queue extends Component {

    static contextType = ApiContext

    render() {
        const { queue = [] } = this.context
        return(
            <div className='queue'>
               <h2>Adopters in line:</h2>
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