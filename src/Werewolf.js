import React, {Component} from 'react';
import './App.css';


const ROLES = ['Maria', 'Guard', 'Spell Caster', 'Seer', 'Hunter', 'Werewolf', 'Cursed', 'Villager'];

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


class Player {
    constructor(pname, role) {
        this.pname = pname;
        this.role = role;
        this.active_wolf = null;
        this.init_stats();
    }

    init_stats() {
        this.bitten = false;
        this.protected = false;
        this.seer = false;
        this.muted = false;
        this.hunted = false;
        this.disabled = false;
        this.previous_target = null;
    }

    do_action(oplayer) {
        this.previous_target = oplayer;
        if (this.disabled) return;
        let r = this.role;
        if (r === 'Maria')
            oplayer.disabled = true;
        else if (r === 'Guard')
            oplayer.protected = true;
        else if (r === 'Spell Caster')
            oplayer.muted = true;
        else if (r === 'Seer')
            oplayer.seer = true;
        else if (r === 'Hunter')
            oplayer.hunted = true;
        else if (this.active_wolf !== null) {
            if (!oplayer.protected) {
                if (oplayer.role === 'Cursed')
                    oplayer.role = 'Werewolf';
                else
                    oplayer.bitten = true;
            }
        }
    }
}

class SetUpPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNames: []
        }
    }

    addPlayer(e) {
        e.preventDefault();
        let playerNames = this.state.playerNames.slice();
        let inp = capitalize(this.refs.player.value);
        if (inp !== "" && !playerNames.includes(inp)) {
            playerNames.push(inp);
            this.setState({'playerNames': playerNames})
        }
        this.refs.player.focus();
        this.refs.player.value = "";
    }

    render() {
        let row = [];
        let playerNames = this.state.playerNames;
        this.state.playerNames.forEach(n => row.push(
            <li className="text-center list-group-item list-group-item-action" key={n}>{n}</li>));
        return (
            <div>
                <h3>Add players to the game</h3>
                <ul className="mb-3 list-group">{row}</ul>
                <form className="form-inline" onSubmit={(e) => this.addPlayer.bind(this)(e)}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" ref="player"/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit">Add</button>
                        </div>
                    </div>

                </form>
                <button className="btn btn-primary" onClick={() => this.props.submitPlayerNames(playerNames)}>Done
                </button>
            </div>
        );
    }
}

class SetUpRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numPlayer: this.props.playerNames.length,
        }
    };

    changeSelectRemain() {
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
            let count = Number(this.refs[role].value);
            for (let i = 0; i < count; i++)
                playerRoles.push(role);
        });
        shuffleArray(playerRoles);

        let playerList = [];
        let wolfNo = 1;
        this.props.playerNames.forEach((n, index) => {
            let p = new Player(n, playerRoles[index]);
            if (p.role === 'Werewolf') {
                p.active_wolf = wolfNo;
                wolfNo += 1
            }
            playerList.push(p)
        });
        this.props.submitPlayer(playerList);
    }

    render() {
        let row = [];
        ROLES.forEach(role => row.push(
            <li className="list-group-item list-group-item-action" key={role}>
                <div className="row">
                    <div className="col-10 text-center">{role}</div>
                    <div className="col-2 text-left">
                        <input ref={role} className="form-control float-right" style={{width: "50px"}} type="number"
                               min="0"
                               onChange={this.changeSelectRemain.bind(this)}/>
                    </div>
                </div>
            </li>)
        );
        return (
            <div>
                <h3>Select roles: {this.state.numPlayer > 0 ? this.state.numPlayer + ' remain' : ''}</h3>
                <ul className="list-group">
                    {row}
                </ul>
                <br/>
                <button className="btn btn-primary" onClick={this.createPlayers.bind(this)}>Done</button>
            </div>
        );
    }
}


class Night extends Component {
    constructor(props) {
        super(props);
        this.state = {
            night: this.props.night,
            currentPlayer: this.props.players[0],
            currentIndex: 0,
            actions: {},
        }
    }

    addAction(e) {
        e.preventDefault();
        let actions = this.state.actions;
        this.props.players.forEach((player, index) => {
            if (this.refs[player.pname].checked) {
                actions[this.state.currentIndex] = index
            }
        });

        this.setState({actions: actions});

        let index = this.state.currentIndex;
        index += 1;
        if (index === this.props.players.length) {
            this.props.submitActions(this.state.actions);
        } else {
            let currentPlayer = this.props.players[index];
            this.setState({
                currentPlayer: currentPlayer,
                currentIndex: index
            });
        }
    }

    render() {
        let row = [];
        this.props.players.forEach((player, index) => {
            let inp = <div key={player.pname} className="custom-control custom-radio">
                <input ref={player.pname} type="radio" id={player.pname} name="target" className="custom-control-input"/>
                <label className="custom-control-label" htmlFor={player.pname}>{player.pname}</label>
            </div>;
            row.push(inp)
        });
        return (
            <div>
                <h2>Night {this.state.night}</h2>
                <h3>Turn of {this.state.currentPlayer.pname}</h3>
                <form onSubmit={(e) => this.addAction.bind(this)(e)}>
                    {row}
                    <button type="submit" className="mt-3 btn btn-primary">Next</button>
                </form>
            </div>
        );
    }
}


class Day extends Component {
    render() {
        return (
            <div>
                <h3>Events: </h3>
                <ul>
                    {this.props.events}
                </ul>
            </div>
        );
    }
}


// const DUMP_PLAYERS = [new Player('Albert', 'Werewolf'), new Player('Alice', 'Seer'), new Player('Golden', 'Villager')];
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // phase: 'night',
            // players: DUMP_PLAYERS,
            phase: 'setUpName',
            players: [],
            playerNames: [],
            night: 1,
        }
    }

    submitPlayerNames(names) {
        this.setState({
            playerNames: names,
            phase: 'setUpRole'
        })
    }

    submitPlayer(players) {
        this.setState({
            players: players,
            phase: 'night'
        })
    }

    submitActions(actions) {
        console.log(actions);
        let events = [];
        let players = this.state.players;
        let bitten = false;
        ROLES.forEach(role => {
            players.forEach((player, index) => {
                if (player.role === role) {
                    let target = players[actions[index]];
                    console.log(player.pname, player.active_wolf);
                    player.do_action(target);
                    console.log(target.pname, target.bitten);
                    // if (player.role !== 'Werewolf') {
                    //     player.do_action(target);
                    // } else if (!bitten) {
                    //     player.do_action(target);
                    //     bitten = true;
                    // }
                }
            })
        });
        players.forEach((player) => {
            if (player.bitten)
                events.push(<li key={player.pname}>{player.pname} died.</li>);
            if (player.muted)
                events.push(<li key={player.pname}>{player.pname} is muted.</li>);
            if (player.seer) {
                if (player.bitten)
                    events.push(<li key={player.pname}>{player.pname} needs to tell truth</li>);
                else
                    events.push(<li key={player.pname}>{player.pname} needs to tell truth (truth: {player.previous_target.pname})</li>)
            }
            player.init_stats();
        });
        this.setState({
            phase: 'day',
            events: events
        });
        events.forEach(e => console.log(e.props));
    }

    render() {
        let phase = this.state.phase;

        if (phase === 'setUpName')
            return <SetUpPlayer submitPlayerNames={this.submitPlayerNames.bind(this)}/>;
        else if (phase === 'setUpRole')
            return <SetUpRole playerNames={this.state.playerNames} submitPlayer={this.submitPlayer.bind(this)}/>;
        else if (phase === 'night')
            return <Night players={this.state.players} night={this.state.night} submitActions={this.submitActions.bind(this)}/>;
        else if (phase === 'day')
            return <Day events={this.state.events}/>;
        else
            return <div> {phase} </div>
    }

}

export default App;
