import React, {Component} from 'react';
import Card from './Card';
import Pusheens from "./../pusheens.json"
//import shuffle from "shuffle-array";

class CardContainer extends Component {

    constructor(props) {
        super(props);

        // setting the state: score is at 1, pusheens is pulling in the pusheen json, and we have no selected pusheens yet
        this.state = {
            score: 1,
            pusheens: Pusheens,
            selectedPusheens: []
        };
    }

    
    // when the user clicks on a pusheen card
    handleClick = (e) => {

        // grab the selected pusheen's id
        let id = e.target.id;

        // init variable that sees if the user selects a pusheen that's already in selectedpusheens
        let exists = false;

        // loop through selected pusheens and see if any ids match selected id
        this.state.selectedPusheens.forEach(pusheen => {

            // if id matches
            // eslint-disable-next-line
            if (pusheen.id == id) {
 
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
            // loop through the pusheen json
            this.state.pusheens.forEach(pusheen => {
                // if the pusheen id matches the selected id
                // eslint-disable-next-line
                if (pusheen.id == id) {
                    // add the pusheen to the selected pusheen array
                    this.setState({selectedPusheens: [...this.state.selectedPusheens, pusheen]});
                    console.log(this.state.selectedPusheens);

                    // update the score
                    this.updateScore();
                }
            })  
        }
        

        // SHUFFLE THE PUSHEENS
        //this.setState({ pusheens: shuffle(this.state.pusheens)});
        console.log("Shuffling Pusheens");

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
        this.setState({score: 1, selectedPusheens: []});
        // update the current score to 0
        this.props.updateCurrentScore(0);
    }

    render() {
        return (
            <div className="container" id="card-container">
                <div className="row">
                    {Pusheens.map(pusheen => <Card src={pusheen.image} key={pusheen.id} id={pusheen.id} alt={pusheen.name} endGame={this.endGame} handleClick={this.handleClick} score={this.state.score} />)}
                </div>
            </div>
        );
    }
}

export default CardContainer;