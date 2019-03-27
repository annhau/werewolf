import React, {Component} from "react";
import {CSSTransitionGroup} from 'react-transition-group' // ES6
import './App.css';


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class Night extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: this.props.players[0],
            currentIndex: 0,
            actions: {},
        }
    }

    async addAction(e) {
        e.preventDefault();

        // Blank the page
        this.refs['main'].outerHTML = '<img alt="spinner" src="https://thumbs.gfycat.com/CarelessOccasionalArgusfish-small.gif" height="30px" />' ;
        await sleep(200);

        let actions = this.state.actions;
        this.props.players.forEach((player, index) => {
            let refDiv = this.refs[player.pname];
            let checkbox = refDiv.childNodes[0];
            if (checkbox.checked) {
                actions[this.state.currentIndex] = index;
                checkbox.checked = false;
                refDiv.style.background = '';
                refDiv.style.color = '';
            }
        });

        this.setState({actions: actions});

        let index = this.state.currentIndex;
        index += 1;
        if (index === this.props.players.length) {
            this.props.submitActions(this.state.actions);
        } else {
            this.setState({
                currentIndex: index
            });
        }
    }

    changeColor() {
        this.props.players.forEach((player, index) => {
            let divRef = this.refs[player.pname];
            if (divRef.childNodes[0].checked) {
                divRef.style.background = 'red';
                divRef.style.color = 'white';
            } else {
                divRef.style.background = 'lightcoral';
                divRef.style.color = '';
            }
        });
    }

    render() {
        let currentPlayer = this.props.players[this.state.currentIndex].pname;
        let row = this.props.players.map((player, index) =>
            <div ref={player.pname} key={player.pname} className="radio-div" onClick={this.changeColor.bind(this)}>
                <input type="radio" id={player.pname} name="target" className="radio-input" required/>
                <label className="radio-label" htmlFor={player.pname}>{player.pname}</label>
            </div>
        );
        return (
            <div key={currentPlayer} className="animated fadeIn">
                <h2>Night {this.props.night}</h2>
                <h3>Turn of <span className="text-white"> {currentPlayer}</span></h3>
                <form onSubmit={(e) => this.addAction.bind(this)(e)}>
                    {row}
                    <button ref='main' type="submit" className="mt-3 btn btn-danger">Next</button>
                </form>
            </div>
        );
    }
}
