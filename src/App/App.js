import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import ApiContext from "../ApiContext";
import config from "../config";
import About from "../pages/About/About";
import HomePage from "../pages/HomePage/HomePage";
import Header from "../components/Header/Header"

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
            userName: {userName, key:'user'},
            queue,
          });
        }).catch((e) => {
          console.log("Error loading queue data");
        });
    };
    deletePet = (pet) =>{
        fetch(`${config.API_ENDPOINT}pets/`+pet, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({type: pet}),
        });
    }
    flipCoin = () =>{
        let coin = Math.floor(Math.random() * 100);
        if(coin < 50){
            this.deletePet('cat');
        }else{
            this.deletePet('dog');
        };
    }
    peopleQue = () =>{
        fetch(`${config.API_ENDPOINT}people`)// people queue
        .then(response => 
            response.json()
        ).then((queue) => {
            this.setState({queue});
        });  
    }
    petQue = (pet) =>{
        fetch(`${config.API_ENDPOINT}pets/` + pet)//first cat
        .then(response => response.json())
        .then((data) => {
          this.setState({data});
        });
    }
    runDemo = (name) => { 
        this.peopleQue();
        this.setState({isAdding : false, inLine: true});
        setTimeout(() => {
        if (name === this.state.queue[0] && this.state.queue.length === 5){//set base case
            clearTimeout(this.runDemo);
            return;
        } if (name !== this.state.queue[0] && this.state.queue.length > 1 ){//run demo adopt
            this.flipCoin();
            fetch(`${config.API_ENDPOINT}people`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(),
            }).then(() => {
                clearTimeout(this.runDemo);
            });
            this.peopleQue();
            this.petQue('cat');//first cat
            fetch(`${config.API_ENDPOINT}pets/dog`)//first dog
            .then(response => response.json())
            .then((dog) => {
              this.setState({dog });
            }).then(() => {
                return this.runDemo(name)
            });

        };
        if ( this.state.queue.length  < 5 && name === this.state.queue[0] ){//run demo post
            this.setState({isFirst: true}); 
            let adoptees = ['Dolly Parton', 'Lucille Ball', 'Jenny From The Block', 'Samantha Adams', 'Chartreuse Brown', 'Michael Phelps', 'Christian Dior', 'Coco Chanel', 'Shay Evans', 'Mr. Potato Head']
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
                <Header />
                <div className='body'>
                    <Route
                        exact path = '/'
                        component= {About}
                    />
                    <Route
                        path = '/home'
                        component = {HomePage}
                    />
                </div>
            </ApiContext.Provider>
        );
    };
};
export default App;