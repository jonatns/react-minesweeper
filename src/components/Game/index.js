import React, { Component } from "react";

import Board from "../Board";

import "./styles.css";

class Game extends Component {
  state = {
    cols: 8,
    rows: 8,
    refreshingTable: false,
    playing: false,
    minesCount: 24,
    mineLocations: [],
    lost: false,
    elapsedTime: 0
  };

  handleOnFieldClick = ({ target }) => {
    const col = parseInt(target.getAttribute("data-col"), 10);
    const row = parseInt(target.getAttribute("data-row"), 10);

    const mineExists = this.state.mineLocations.some(
      location => location.col === col && location.row === row
    );

    if (mineExists) {
      const text = document.createTextNode("💥");
      target.appendChild(text);
      this.setState({ lost: true, playing: false });
      clearInterval(this.timer);
    }
  };

  setDifficulty = e => {
    let cols = 8;
    let rows = 8;
    switch (e.target.value) {
      case "easy":
        cols = 8;
        rows = 8;
        break;

      case "beginner":
        cols = 9;
        rows = 9;
        break;

      case "intermediate":
        cols = 16;
        rows = 16;
        break;

      case "advanced":
        cols = 24;
        rows = 24;
        break;

      default:
        break;
    }

    this.setState(
      {
        cols,
        rows,
        mineLocations: [],
        lost: false,
        playing: false,
        refreshingTable: true,
        elapsedTime: 0
      },
      () => {
        setTimeout(() => {
          this.setState({
            refreshingTable: false
          });
        }, 0);
      }
    );
  };

  generateMines = () => {
    const mineLocations = [];
    for (let i = 0; i < this.state.minesCount; i++) {
      const colLocation = Math.floor(Math.random() * this.state.cols);
      const rowLocation = Math.floor(Math.random() * this.state.rows);

      mineLocations.push({
        col: colLocation,
        row: rowLocation
      });
    }

    return this.setState({ mineLocations });
  };

  handleStartGame = () => {
    this.generateMines();
    this.setState({ playing: true, now: Date.now() });
    this.timer = setInterval(this.tick, 50);
  };

  handleRestartGame = () => {
    if (!this.state.refreshingTable) {
      this.generateMines();
      this.setState(
        {
          lost: false,
          refreshingTable: true,
          playing: false
        },
        () => {
          setTimeout(() => {
            this.setState({
              refreshingTable: false,
              playing: true,
              now: Date.now()
            });
            this.timer = setInterval(this.tick, 50);
          }, 0);
        }
      );
    }
  };

  tick = () => {
    this.setState({ elapsedTime: new Date() - this.state.now });
  };

  render() {
    var elapsed = Math.round(this.state.elapsedTime / 100);
    var seconds = (elapsed / 10).toFixed(1);

    return (
      <div className="game">
        <div className="header">
          <div>
            <h2>
              <span>Your time:</span>
              <span className="timer">{seconds}</span>
            </h2>
          </div>
          <div>
            <span>Difficulty:</span>{" "}
            <select
              className="level"
              onChange={this.setDifficulty}
              disabled={this.state.playing}
            >
              <option value="easy">Easy</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>{" "}
          </div>
        </div>
        <div className="board-container">
          <span
            className="emoji"
            onClick={
              this.state.playing || this.state.lost
                ? this.handleRestartGame
                : this.handleStartGame
            }
          >
            {this.state.lost || this.state.clicking ? "😵" : "😎"}
          </span>
          <Board
            cols={this.state.cols}
            rows={this.state.rows}
            refreshingTable={this.state.refreshingTable}
            onFieldClick={this.handleOnFieldClick}
          />
        </div>
      </div>
    );
  }
}

export default Game;
