import React, {Component} from "react";

export class Day extends Component {
    skipExecute() {
        this.props.executePlayer(null);
    }

    executePlayer(e) {
        e.preventDefault();
        this.props.players.forEach((player, index) => {
            if (this.refs[player.pname].childNodes[0].checked) {
                this.props.executePlayer(player)
            }
        });
    }

    changeColor() {
        this.props.players.forEach((player, index) => {
            let divRef = this.refs[player.pname];
            if (divRef.childNodes[0].checked) {
                divRef.style.background = 'red';
                divRef.style.color = 'white';
            } else {
                divRef.style.background = '';
                divRef.style.color = '';
            }
        });
    }

    render() {
        let row = [];
        this.props.players.forEach((player, index) => {
            let inp = <div ref={player.pname} key={player.pname} className="radio-div"
                           onClick={this.changeColor.bind(this)}>
                <input type="radio" id={player.pname} name="target" className="radio-input"
                       required/>
                <label className="radio-label" htmlFor={player.pname}>{player.pname}</label>
            </div>;
            row.push(inp)
        });
        let originPlayers = this.props.originPlayers.map(player =>
            <li key={'origin' + player.pname}>{player.pname}: {player.role} {player.active_wolf}</li>);
        return (
            <div className="animated fadeInLeft" key={this.props.night}>
                <h3>Events: </h3>
                <ul>
                    {this.props.events ? this.props.events : "Nothing happened"}
                </ul>

                {this.props.gameOver !== null
                    ? <div>
                        <h3>{this.props.gameOver}</h3>
                        <ul>{originPlayers}</ul>
                        <h3>History</h3>
                        <ul>{this.props.logs}</ul>
                        <button onClick={() => this.props.restart()} className="btn btn-danger">New game</button>
                    </div>
                    : <div>
                        <h3> Who's the wolf ? </h3>
                        <form onSubmit={(e) => this.executePlayer.bind(this)(e)}>
                            {row}
                            <button type="submit" className="mt-3 mr-3 btn btn-danger">Execute</button>
                            <button onClick={this.skipExecute.bind(this)} className="mt-3 btn btn-secondary">Skip
                            </button>
                        </form>
                    </div>
                }
            </div>
        );
    }
}
