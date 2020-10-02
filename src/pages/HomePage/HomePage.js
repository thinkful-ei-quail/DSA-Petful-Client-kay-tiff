import React, { Component } from 'react'

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        };
    }

    render() {
        return(
            <div className='container'>
              <h1>Header</h1>
              <h2>Cat</h2>
              <h2>Dog</h2>
              <h2>Queue</h2>
              <h2>Form</h2>
              <h2>Adopt</h2>
            </div>
        );
    }
}

export default HomePage