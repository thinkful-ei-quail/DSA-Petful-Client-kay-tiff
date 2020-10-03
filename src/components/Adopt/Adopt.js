import React, { Component } from 'react'

class Adopt extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        };
    }

    render() {
        return(
            <div className='Adopt'>
               <h2> Are you sure?</h2>
               <button>Yes</button>
               <button>No</button>
            </div>
        );
    }
}

export default Adopt