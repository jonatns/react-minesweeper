import React, { Component } from "react";

import Field from "../Field";

import "./styles.css";

class Board extends Component {
  renderRow = row => {
    let cols = [];
    for (let i = 0; i < this.props.cols; i++) {
      cols.push(
        <Field
          key={i}
          col={i}
          row={row}
          onFieldClick={this.props.onFieldClick}
        />
      );
    }

    return cols;
  };

  drawBoard = () => {
    let rows = [];
    for (let i = 0; i < this.props.rows; i++) {
      const row = this.renderRow(i);
      rows.push(<tr key={i}>{row}</tr>);
    }

    return rows;
  };

  render() {
    return (
      <div className="board">
        <table className="table">
          <tbody>{!this.props.refreshingTable && this.drawBoard()}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
