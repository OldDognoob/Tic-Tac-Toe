
import React,{Component} from "react";
import Board from './Board';
export default class Game extends Component {
  // accepts props as the parameter
  constructor(props) {
    // the super calls the constructor component of react component
    super(props);
    // set the state of the component
    this.state = {
      // boolean value, a question of find the next person or not
      xIsNext: true,
      // use that for history of moving back and forward
      stepNumber: 0,
      // history is an array
      history: [
        // we are going to fill with squares equal to 9 elements fill by null value
        { squares: Array(9).fill(null) },
      ],
    };
  }
  // we are using the jump to update the step
  jumpTo(step) {
    this.setState({
      // the step is the parameter
      stepNumber: step,
      // we need to update the x
      // base by the step devided by 2 is 0 then  it means we are in even steps
      // we updating the steps to true
      // otherwise this means that it will be false.
      xIsNext: (step % 2) === 0,
    });
  }
  // handleClick accepts the square from 0-8
  handleClick(i) {
    // the first thing we are adding is the current history
    // by updating the state and using the slice function(accepts 2 parameters: First the bigging, Second the end )
    // by running history we are getting all the application in each step
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // what is the current step of the squares
    // so we need to get the last item of the update
    const current = history[history.length - 1];
    // we need to create the duplicate squares and put them in the square content
    const squares = current.squares.slice();
    // we are adding the winner . calculateWinner function is responsible to calculate the winner
    const winner = calculateWinner(squares);
    // if winner exists or squares, user clicks then I should return nothing
    if (winner || squares[i]) {
      return;
    }
    // otherwise the user that clicks is x or o
    squares[i] = this.state.xIsNext ? "X" : "O";
    // we updating the state function by updating by history
    this.setState({
      //concatinating the current with the previous history
      history: history.concat({
        squares: squares,
      }),
      // updating the x is next
      xIsNext: !this.state.xIsNext,
      // the length of the history
      stepNumber: history.length
    });
  }
  // define the render function 4 properties
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
        const desc = move ? 'Go to #' + move : 'Start the Game';
        return (
            <li key={move}>
                <button onClick={() => { this.jumpTo(move) }}>
                    {desc}
                </button>
            </li>
        )
    });
    let status;
    if (winner) {
        status = 'Winner is ' + winner;
    } else {
        status = 'Next Player is ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
        <div className="game">
            <div className="game-board">
                <Board onClick={(i) => this.handleClick(i)}
                    squares={current.squares} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ul>{moves}</ul>
            </div>

        </div>
    )
}
}
// we define the calculateWinner outside
function calculateWinner(squares) {
  // by null means there is no winner and we need to continue playing the game
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[b] === squares[c] &&
      squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
