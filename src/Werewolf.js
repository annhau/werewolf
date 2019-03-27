import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group' // ES6
import './App.css';
import {SetUpPlayer} from "./SetUpPlayer";
import {Player} from "./Player";
import {SetUpRole} from "./SetUpRole";
import {Night} from "./Night";
import {Day} from "./Day";


export const ROLES = ['Maria', 'Guard', 'Spell Caster', 'Seer', 'Hunter', 'Werewolf', 'Cursed', 'Villager'];

export function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


let albert = new Player('Albert', 'Werewolf');
albert.active_wolf = 1;
let goldy = new Player('Goldy', 'Werewolf');
goldy.active_wolf = 2;
const DUMP_PLAYERS = [albert, goldy,
    new Player('Alice', 'Seer'),
    new Player('Golden', 'Hunter'),
    new Player('Goldeny', 'Villager'),
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phase: 'setUpName',
            players: [],
            playerNames: [],
            night: 1,
            logs: [],
        }
    }

    nextPhase() {
        this.setState((state, props) => {
            return {phase: 'night', night: state.night + 1}
        })
    }

    submitPlayerNames(names) {
        if (names.length !== 0) {
            this.setState({
                playerNames: names,
                phase: 'setUpRole'
            })
        }
    }

    submitPlayer(players) {
        let gameOver = this.gameOver(players);
        if (gameOver) {
            this.setState({
                players: players,
                originPlayers: players.slice(0),
                phase: 'day',
                gameOver: gameOver
            })
        } else {
            this.setState({
                players: players,
                originPlayers: players.slice(0),
                phase: 'night'
            })
        }
    }

    getActiveWolf() {
        return this.state.players.filter(e => e.active_wolf !== null)
            .reduce((prev, current) => (prev.active_wolf < current.active_wolf) ? prev : current)
    }

    submitActions(actions) {
        let players = this.state.players;

        // Handle Actions
        let activeWolf = this.getActiveWolf();
        let logs = this.state.logs;
        logs.push(<p><b>Night {this.state.night}</b></p>);
        ROLES.forEach(role => {
            players.forEach((player, index) => {
                if (player.role === role) {
                    let target = players[actions[index]];
                    if (player.role !== 'Werewolf') {
                        player.do_action(target);
                    } else if (player === activeWolf) {
                        player.do_action(target);
                    }
                    // Add logs
                    logs.push(<li>{player.role}{player.active_wolf} choose {target.role}{target.active_wolf}</li>)
                }
            })
        });

        // Handle events
        let dead_players = [];
        let events = [];
        players.forEach((player) => {
            if (player.bitten) {
                events.push(<li key={player.id}>{player.pname} died.</li>);
                dead_players.push(player);
                if (player.role === 'Hunter' && player.previous_target !== player) {
                    events.push(<li key={player.previous_target.id}>{player.previous_target.pname} died.</li>);
                    dead_players.push(player.previous_target);
                }
            }
            if (player.muted)
                events.push(<li key={player.id}>{player.pname} is muted.</li>);
            if (player.seer) {
                if (player.bitten)
                    events.push(<li key={player.id}>{player.pname} needs to tell truth</li>);
                else
                    events.push(<li key={player.id}>{player.pname} needs to tell truth
                        (truth: {player.previous_target.pname})</li>)
            }
            player.init_stats();
        });

        players = players.filter((e) => !dead_players.includes(e));
        this.setState({
            phase: 'day',
            events: events,
            players: players,
            gameOver: this.gameOver(players),
            logs: logs
        });
    }

    gameOver(players) {
        let countVillagers = 0;
        players.forEach(player => {
            countVillagers = player.role === 'Werewolf' ? countVillagers - 1 : countVillagers + 1
        });
        if (countVillagers === players.length)
            return 'Villagers won.';
        else if (countVillagers <= 0)
            return 'Wolfs won.';
        else
            return null
    }

    restart() {
        this.setState({
            phase: 'setUpName',
            players: [],
            playerNames: [],
            events: [],
            night: 1,
            logs: [],
        })
    }

    executePlayer(player) {
        let players = this.state.players.filter(e => e !== player);
        let gameOver = this.gameOver(players);
        if (!gameOver) {
            this.setState((state, props) => {
                return {
                    players: players,
                    phase: 'night',
                    night: state.night + 1
                }
            })
        } else {
            this.setState({
                players: players,
                phase: 'day',
                gameOver: gameOver
            })
        }

    }

    render() {
        let phase = this.state.phase;

        if (phase === 'setUpName')
            return <SetUpPlayer submitPlayerNames={this.submitPlayerNames.bind(this)}/>;
        else if (phase === 'setUpRole')
            return <SetUpRole playerNames={this.state.playerNames} submitPlayer={this.submitPlayer.bind(this)}/>;
        else if (phase === 'night')
            return <Night players={this.state.players} night={this.state.night}
                          submitActions={this.submitActions.bind(this)}/>;
        else if (phase === 'day')
            return <Day events={this.state.events}
                        nextPhase={this.nextPhase.bind(this)}
                        players={this.state.players}
                        originPlayers={this.state.originPlayers}
                        executePlayer={this.executePlayer.bind(this)}
                        logs={this.state.logs}
                        gameOver={this.state.gameOver} restart={this.restart.bind(this)}/>;
        else
            return <div> {phase} </div>
    }
}

export default App;
