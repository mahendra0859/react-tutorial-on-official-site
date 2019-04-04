import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// class Square extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {value: null};
//     //     // console.log("this.state", this)
//     // }
//     render() {
//       return (
//         // <button className="square" onClick={() => this.setState({value: 'X'})}>
//         <button className="square" onClick={() => this.props.onClick()}>
//         {/* {console.log("this", this)}
//         {console.log("this.props", this.props)} */}
//           {/* {this.props.value} */}
//           {/* {console.log("this.state.value", this.state.value)} */}
//           {/* {this.state.value} */}
//           {this.props.value}
//         </button>
//       );
//     }
//   }
//   Function Components
function Square(props) {
    return (<button className="square" onClick={props.onClick}>{props.value}</button>)
}
  
  class Board extends React.Component {
      // constructor(props) {
      //     super(props);
      //     this.state= {
      //         squares: Array(9).fill(null),
      //         xIsNext: true
      //   }
      //     console.log("this.state.squares", this.state.squares)
      // }
      // handleClick(i) {
      //   //   Mutability
      //   // const squares = this.state.squares;
      //   // squares[i]='X';
      //   //   Immutability
      //     const squares = this.state.squares.slice();
      //     if (calculateWinner(squares) || squares[i]) {
      //         return;              
      //     }
      //     squares[i] = this.state.xIsNext?'X':'O';
      //     console.log("Before set this.state", this.state);
      //     this.setState({squares, xIsNext: !this.state.xIsNext}, () => console.log("After set this.state", this.state));          
      // }
    // renderSquare(i) {
    //   return <Square value={this.props.squares[i]} onClick={() => this.handleClick(i)}/>;
    // }
    renderSquare(i) {
      return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }
  
    render() {
        // React way
    //   const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // Javascript Templae Literals
    //   const status = `Next player:   ${this.state.xIsNext ? 'X' : 'O'}`;

      // const winner = calculateWinner(this.state.squares);
      // let status = null;
      // if (winner) {
      //     status = 'Winner: ' + winner;
      // } else {
      //     status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
      // }
  
      return (
        <div>
          {/* <div className="status">{status}</div> */}
          <div className="board-row">
          {/* {console.log(this.renderSquare())} */}
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        xIsNext: true,
        stepNumber: 0
      }
    }
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;              
        }
        squares[i] = this.state.xIsNext?'X':'O';
        console.log("Before set this.state", this.state);
        this.setState({history: history.concat(
          [{squares}]
        ), xIsNext: !this.state.xIsNext,stepNumber:history.length}, () => console.log("After set this.state", this.state));          
    }
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      })
  }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      });
      let status;
      (winner) ? status = 'Winner: ' + winner : status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} onClick={i => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
// Function Component
  // function Game() {
  //   return (
  //       <div className="game">
  //         <div className="game-board">
  //           <Board />
  //         </div>
  //         <div className="game-info">
  //           <div>{/* status */}</div>
  //           <ol>{/* TODO */}</ol>
  //         </div>
  //       </div>
  //     );
  // }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  

  function calculateWinner(squares) {
      const lines = [
          [0,1,2],
          [3,4,5],
          [6,7,8],
          [0,4,8],
          [2,4,6],
          [0,3,6],
          [1,4,7],
          [2,5,8]
      ];
      for(let i=0;i<lines.length;i++){
          const [a,b,c] = lines[i];
          if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
              return squares[a];
          }          
      }
      return null;
  }