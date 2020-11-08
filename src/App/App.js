import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import ApiContext from "../ApiContext";
import config from "../config";
import About from "../pages/About/About";
import HomePage from "../pages/HomePage/HomePage";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pets:[],
            dog: [],
            cat: [],
            queue: [],
            userName:null,
            isAdding: false,
            inLine: false,
            isFirst: false,
            adoptCat : false,
            adoptDog : false,
            name: {
              value: "",
          },
        };
    };
    componentDidMount() {
        fetch(`${config.API_ENDPOINT}pets`)//all pets
        .then(response => response.json())
        .then((pets) => {
          this.setState({pets });
        })
        .catch((error) => {
          console.error(error.message );
        });

        fetch(`${config.API_ENDPOINT}pets/cat`)//first cat
        .then(response => response.json())
        .then((cat) => {
          this.setState({cat });
        })
        .catch((error) => {
          console.error(error.message );
        });

        fetch(`${config.API_ENDPOINT}pets/dog`)//first dog
        .then(response => response.json())
        .then((dog) => {
          this.setState({dog });
        })
        .catch((error) => {
          console.error(error.message );
        });

        fetch(`${config.API_ENDPOINT}people`)// people queue
        .then(response => response.json())
        .then((queue) => {
          this.setState({queue});
        })
        .catch((error) => {
          console.error(error.message );
        });
    };
    renderRoutes(){
        return(
            <>
                <Route
                    exact path = '/'
                    component= {About}
                />
                <Route
                    path = '/home'
                    component = {HomePage}
                />

            </>
        )
    };
    onClickJoin = () => {
        if (this.state.inLine){
            alert( 'You are already in line!');
        }else{
        this.setState({ isAdding : true});
        };
    };
    enqueue = (userName) => {
        fetch(`${config.API_ENDPOINT}people`)
        .then((res) => res.json())
        .then((queue) => {
          this.setState({
            userName: userName,
            queue,
          });
        }).catch((e) => {
          console.log("Error loading queue data");
        });
    };
    runDemo = (name) => { 
        fetch(`${config.API_ENDPOINT}people`)// people queue
        .then(response => 
            response.json()
        ).then((queue) => {
            this.setState({queue});
        })
        console.log('queue', this.state.queue,'name',name)
        this.setState({isAdding : false, inLine: true});
        setTimeout(() => {
        if (name === this.state.queue[0] && this.state.queue.length === 5){//set base case
            console.log('a')
            this.setState({isFirst: true});
            clearTimeout(this.runDemo);
            return;
        } if (name !== this.state.queue[0] && this.state.queue.length > 1 ){//run demo adopt
            console.log('b')
            let coin = Math.floor(Math.random() * 100);
            if(coin < 50){
                fetch(`${config.API_ENDPOINT}pets/cat`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({type: 'cat'}),
                })
            }else{
                fetch(`${config.API_ENDPOINT}pets/dog`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({type: 'dog'}),
                })
            };
            fetch(`${config.API_ENDPOINT}people`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(),
            }).then(() => {
                clearTimeout(this.runDemo);
            });
            fetch(`${config.API_ENDPOINT}people`)// people queue
            .then(response => 
                response.json()
            ).then((queue) => {
                this.setState({queue});
            }).then(() => {
                return this.runDemo(name)
            }); 
        };
        if ( this.state.queue.length  < 5 && name === this.state.queue[0] ){//run demo post
            console.log('c')
            let adoptees = ['Dolly Parton', 'Lucy Ball', 'Jenny From The Block', 'Samantha Adams', 'Chartreuse Brown', 'Michael Phelps', 'Christian Dior', 'Coco Chanel', 'Shay Evans', 'Mr.PotatoHead']
            fetch(`${config.API_ENDPOINT}people`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    person: adoptees[Math.floor((Math.random() * 10))],
                }),
            }).then(() => {
                clearTimeout(this.runDemo)
            }).then(
                fetch(`${config.API_ENDPOINT}people`)// people queue
                .then(response => response.json())
                .then((queue) => {
                  this.setState({queue});
                }).then(() => {
                    return this.runDemo(name)
                })  
            )
        }
    }, 5000)};
    render() {
        const value = {
            pets: this.state.pets,
            dog: this.state.dog,
            cat: this.state.cat,
            queue: this.state.queue,
            isAdding: this.state.isAdding,
            inLine: this.state.inLine,
            isFirst: this.state.isFirst,
            adoptCat: this.state.adoptCat,
            adoptDog: this.state.adoptDog,
            userName: this.state.userName,
            enqueue: this.enqueue,
            runDemo: this.runDemo,
            onClickJoin: this.onClickJoin,
        };
        return(
            <ApiContext.Provider value={value}>
                {this.renderRoutes()}
            </ApiContext.Provider>
        );
    };
};
export default App;