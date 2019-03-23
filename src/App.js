import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


const ROLES = ['Maria', 'Guard', 'Spell Caster', 'Seer', 'Hunter', 'Werewolf', 'Villager'];

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


class Player {
    constructor(pname, role) {
        this.pname = pname;
        this.role = role;
        this.init_stats();
    }

    init_stats() {
        this.bitten = false;
        this.protected = false;
        this.seer = false;
        this.muted = false;
        this.hunted = false;
        this.disabled = false;
        this.active_wolf = false;
    }

    do_action(oplayer) {
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
        else if (r.active_wolf) {
            oplayer.bitten = !oplayer.protected;
        }
    }
}


class NightPhase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: 0,
            actions: []
        }
    }

    addAction(current, target) {
        let actions = this.state.actions.slice();
        if (!actions.hasOwnProperty(current)) {
            actions.push({[current]: target});
            this.setState((state, props) => ({'actions': actions, 'currentPlayer': state.currentPlayer + 1}));
        }
    }

    render() {
        let currentPlayer = this.state.currentPlayer;
        if (currentPlayer >= this.props.players.length) {
            this.props.changePhase('notify');
            return <div>N/A</div>
        }

        let row = [];
        this.props.players.forEach((player, i) =>
            row.push(<li onClick={() => this.addAction.bind(this)(currentPlayer, i)}
                         key={player.pname} className="list-group-item list-group-item-action">{player.pname}</li>)
        );
        return (
            <div>
                <h2>Turn of {this.props.players[currentPlayer].pname}</h2>
                <ul className="list-group">
                    {row}
                </ul>
            </div>
        );
    }
}


class Notification extends Component {
    render() {
        return (
            <div>
                <p>Nothing happened.</p>
            </div>
        );
    }
}


class SetUpPlayer extends Component {
    render() {
        let row = [];
        this.props.names.forEach(n => row.push(<li className="list-group-item list-group-item-action"
                                                   key={n}>{n}</li>));
        return (
            <div>
                <h3>Add players to the game</h3>
                <ul className="list-group">{row}</ul>
                <form className="form-inline" onSubmit={(e) => this.props.handleAdd(e, this.refs.player)}>
                    <input className="form-control" name="name" ref="player"/>
                    <button className="form-control" type="submit">Add</button>
                </form>
                <br/>
                <button className="btn btn-primary" onClick={() => this.props.handleDone('setup_role')}>Done</button>
            </div>
        );
    }
}


class SetUpRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numPlayer: this.props.numPlayer
        }
    };

    addRole(role) {
        this.setState({[role]: Number(this.refs[role].value)});
    }

    addRolesToParent() {
        ROLES.forEach(role => {
            let count = Number(this.refs[role].value);
            if (count > 0)
                this.props.createPlayer(role, count);
        });
        this.props.changePhase('night');
    }

    render() {
        let row = [];
        ROLES.forEach(role => row.push(
            <li className="list-group-item list-group-item-action" key={role}>
                <div className="form-inline">
                    <span> {role}</span>
                    <input className="form-control float-right" style={{width: "50px"}} type="number" min="0"
                           onChange={() => this.addRole(role)} ref={role}/>
                </div>
            </li>)
        );
        return (
            <div>
                <h3>Select {this.state.numPlayer} roles</h3>
                <ul className="list-group">
                    {row}
                </ul>
                <br/>
                <button className="btn btn-primary" onClick={this.addRolesToParent.bind(this)}>Done</button>
            </div>
        );
    }
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'day': 1,
            'players': [],
            'names': [],
            'roles': [],
            'logs': [],
            'actions': [],
            'phase': 'setup_player',
        }
    }

    addPlayerName(e, nameRef) {
        e.preventDefault();
        let names = this.state.names.slice();
        names.push(capitalize(nameRef.value));
        nameRef.value = "";
        nameRef.focus();
        this.setState({'names': names});
    }

    createPlayer(roleName, number) {
        let players = [];
        let names = this.state.names;
        if (names.length === 0) return;
        for (let i = 0; i < number; i++) {
            players.push(new Player(names.splice(Math.floor(Math.random() * names.length), 1)[0], roleName))
        }
        this.setState({'players': players, 'names': names});
    }

    changePhase(phaseName) {
        this.setState({
            'phase': phaseName
        })
    }

    getPlayersByRole(role, actions) {
        let players = [];
        this.state.players.forEach((player, index) => {
            if (player.role === role){
                let targetIndex = actions[index]; // index
                player.do_action(players[targetIndex])
            }

        });
        return players
    }

    processActions() {
        let players = this.state.players;
        let actions = this.state.actions;
        ROLES.forEach(role => {
            let role_players = this.getPlayersByRole(role); // list of indexes
            role_players.forEach()
        });
        // Object.entries(this.state.actions)
        //     .forEach(entry => (players[entry[0]].do_action(players[1])))
    }

    render() {
        if (this.state.phase === 'setup_player') {
            return <SetUpPlayer names={this.state.names}
                                handleAdd={this.addPlayerName.bind(this)}
                                handleDone={this.changePhase.bind(this)}/>
        } else if (this.state.phase === 'setup_role') {
            return <SetUpRole createPlayer={this.createPlayer.bind(this)}
                              numPlayer={this.state.names.length}
                              changePhase={this.changePhase.bind(this)}/>
        } else if (this.state.phase === 'night') {
            return <NightPhase players={this.state.players}
                               changePhase={this.changePhase.bind(this)}/>
        } else if (this.state.phase === 'notify')
            return <div></div>;
        return (
            <div>
                Phase changed: {this.state.phase}
                {this.state.names}
            </div>
        );
    }
}

export default App;
