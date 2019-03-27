import React, {Component} from "react";

export class SetUpPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNames: []
        }
    }

    addPlayer(e) {
        e.preventDefault();
        let playerNames = this.state.playerNames.slice();
        let inp = this.refs.player.value.trim().replace(/\b\w/g, l => l.toUpperCase());
        if (inp === "") {
            this.setState({error: "Do not use empty string"})
        } else if (playerNames.includes(inp)) {
            this.setState({error: "Do not use the same name"});
        } else {
            playerNames.push(inp);
            this.setState({'playerNames': playerNames, error: null})
        }
        this.refs.player.focus();
        this.refs.player.value = "";
    }

    render() {
        let row = [];
        let playerNames = this.state.playerNames;
        this.state.playerNames.forEach(n => row.push(
            <li className="" key={n}>{n}</li>));
        return (
            <div className="animated zoomIn">
                <h3>Add players to the game</h3>
                {this.state.error ? <p className="text-danger"> {this.state.error}</p> : null}
                <ul className="mb-3">{row}</ul>
                <form className="form-inline" onSubmit={(e) => this.addPlayer.bind(this)(e)}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" ref="player"/>
                        <div className="input-group-append">
                            <button className="btn btn-danger" type="submit">Add</button>
                        </div>
                    </div>
                </form>
                <button className="btn btn-danger" onClick={() => this.props.submitPlayerNames(playerNames)}>
                    Done
                </button>
            </div>
        );
    }
}
