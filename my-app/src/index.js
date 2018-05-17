import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    /*
      1) In JavaScript classes, you need to explicitly call super(); when defining the constructor of a subclass.
      2) Adding a constructor to the class to initialize the state.
      3) Using this.state to add state to a component.
    */

    render() {
      return (
        <button className="square" onClick = {() => this.props.onClick()}>
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    /*
      Pulling state upwards during refactoring React components to monitor child components' state keep them in sync.
      Add a constructor to the Board and set its initial state to contain an array with 9 nulls, 
      corresponding to the 9 squares.
    */
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
      };
    }

    /*
      Note that DOM <button> element’s onClick attribute has a special meaning to React, 
      but we could have named Square’s onClick prop or Board’s handleClick method differently. 
      It is, however, conventional in React apps to use on* names for the attributes and handle* for the handler methods.

      Square no longer keeps its own state; it receives its value from its parent Board and informs its parent when it’s clicked. 
      We call components like this controlled components.
    */

    handleClick(i) {
      const squares = this.state.squares.slice(); // call .slice() to copy the squares array instead of mutating the existing array.
      squares[i] = 'X';
      this.setState({squares: squares});
    }
    
    /*
      Now we need to change what happens when a square is clicked. 
      The Board component now stores which squares are filled, 
      which means we need some way for Square to update the state of Board. 
      Since component state is considered private, we can’t update Board’s state directly from Square.
      The usual pattern here is pass down a function from Board to Square that gets called when the square is clicked. 
    */

    renderSquare(i) {
      return (
        <Square
          value = {this.state.squares[i]} // Modify Board’s renderSquare method to pass a value prop to Square.
          onClick = {() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  