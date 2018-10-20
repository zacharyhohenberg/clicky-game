import React, {Component} from 'react';
import Card from './Card';
import Cars from "./../cars.json"
//import shuffle from "shuffle-array";

class CardContainer extends Component {

    constructor(props) {
        super(props);

        // setting the state: score is at 1,Cars is pulling in the cars json, and we have no selected Cars yet
        this.state = {
            score: 1,
           Cars:Cars,
            selectedCars: []
        };
    }

    
    // when the user clicks on a cars card
    handleClick = (e) => {

        // grab the selected cars' id
        let id = e.target.id;

        // init variable that sees if the user selects a pusheen that's already in selectedcars
        let exists = false;

        // loop through selectedCars and see if any ids match selected id
        this.state.selectedCars.forEach(cars => {

            // if id matches
            // eslint-disable-next-line
            if (cars.id == id) {
 
                // change exists to true
                exists = true;
            }
        })

        // if exists is true
        if (exists) {
            // end the game
            this.endGame();
        }

        // otherwise
        else {
            // loop through the cars json
            this.state.cars.forEach(cars => {
                // if the cars id matches the selected id
                // eslint-disable-next-line
                if (cars.id == id) {
                    // add the cars to the selected cars array
                    this.setState({selectedCars: [...this.state.selectedCars, cars]});
                    console.log(this.state.selectedCars);

                    // update the score
                    this.updateScore();
                }
            })  
        }
        

        // SHUFFLE THE Cars
        //this.setState({Cars: shuffle(this.state.cars)});
        console.log("Shuffling Cars");

    }

    // function to update the current game's score
    updateScore = () => {
        // set the new score
        this.setState({score: this.state.score + 1});
        // update the parent component's display
        this.props.updateCurrentScore(this.state.score);
        console.log("Score: " + this.state.score);
    }

    // function to end the game
    endGame = () => {
        console.log("End!");
        // push the current game score as the new top score 
        this.props.updateTopScore(this.state.score);
        // set the score back to 1 and the selected array to empty 
        this.setState({score: 1, selectedCars: []});
        // update the current score to 0
        this.props.updateCurrentScore(0);
    }

    render() {
        return (
            <div className="container" id="card-container">
                <div className="row">
                    {Cars.map(cars => <Card src={cars.image} key={cars.id} id={cars.id} alt={cars.name} endGame={this.endGame} handleClick={this.handleClick} score={this.state.score} />)}
                </div>
            </div>
        );
    }
}

export default CardContainer;