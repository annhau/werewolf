import React, {Component} from "react";
import {Player} from "./Player";
import {ROLES, shuffleArray} from "./Werewolf";

export class SetUpRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numPlayer: this.props.playerNames.length,
        }
    };

    changeSelectRemain() {
        // Count selected player if calculate remaining
        let total = 0;
        ROLES.forEach(role => {
            let count = Number(this.refs[role].value);
            if (count > 0)
                total += count
        });
        this.setState({numPlayer: this.props.playerNames.length - total});
    }

    createPlayers() {
        let playerRoles = [];
        ROLES.forEach(role => {
            let count = Number(this.refs[role].value); // get role's value from input tag
            for (let i = 0; i < count; i++)
                playerRoles.push(role);
        });
        if (playerRoles.length !== this.props.playerNames.length) return; // return if not satisfy
        shuffleArray(playerRoles); // randomly shuffle roles

        let playerList = [];
        let wolfNo = 1;
        this.props.playerNames.forEach((n, index) => {
            let p = new Player(n, playerRoles[index]);
            if (p.role === 'Werewolf') {
                p.active_wolf = wolfNo;
                wolfNo += 1
            }
            playerList.push(p);
        });
        this.props.submitPlayer(playerList);
    }

    createSelection() {
        return ROLES.map(role =>
            <li className="list-group-item" key={role}>
                {role}
                <span className="btn float-right"
                      onClick={() => {
                          this.refs[role].value = Number(this.refs[role].value) + 1;
                          this.changeSelectRemain()
                      }}>
                    <i className="fas fa-plus-circle text-white"/>
                </span>
                <input ref={role} className="form-control float-right roleInput" type="text" readOnly/>
                <span className="btn float-right"
                      onClick={() => {
                          let value = this.refs[role].value;
                          this.refs[role].value = value > 0 ? Number(value) - 1 : value;
                          this.changeSelectRemain();
                      }}>
                    <i className="fas fa-minus-circle text-white"/>
                </span>
            </li>
        );
    }

    render() {
        let error = this.state.numPlayer < 0 ? <p className="text-danger"> Number of roles is not correct </p> : null;
        let remaining = this.state.numPlayer > 0 ? this.state.numPlayer + ' remain' : null;
        let doneButton = error ? error :
            <button className="btn btn-danger" onClick={this.createPlayers.bind(this)}>Done</button>;
        return (
            <div>
                <h3>Select roles: {remaining}</h3>
                <ul className="list-group" id="roleSelection">
                    {this.createSelection()}
                </ul>
                <br/>
                {doneButton}
            </div>
        );
    }
}
