import React, { Component } from "react";

import "./styles.css";

class Field extends Component {
  render() {
    return (
      <td
        className="field"
        onClick={this.props.onFieldClick}
        data-row={this.props.row}
        data-col={this.props.col}
      />
    );
  }
}

export default Field;
