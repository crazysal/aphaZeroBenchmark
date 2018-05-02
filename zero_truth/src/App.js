// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;

import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import React from 'react';


function IsVictory(cells) {

	console.log(cells)
  
  // Return true if `cells` is in a winning configuration.
}

const TicTacToe = Game({
  setup: () => ({ cells: Array(24).fill(null) }),

  moves: {
    clickCell(G, ctx, id) {
      const cells = [...G.cells];

      // Ensure we can't overwrite cells.
      if (cells[id] === null) {
        cells[id] = ctx.currentPlayer;
      }

      return { ...G, cells };
    },
  },

  flow: {
    endGameIf: (G, ctx) => {
      if (IsVictory(G.cells)) {
        return ctx.currentPlayer;
      }
    },
  },
});

////////////////////////////////////  Board 





class TicTacToeBoard extends React.Component {
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
      this.props.events.endTurn();
    }
  }

  isActive(id) {
    if (!this.props.isActive) return false;
    if (this.props.G.cells[id] !== null) return false;
    return true;
  }

  render() {
    let winner = '';
    if (this.props.ctx.gameover !== null) {
      winner = <div>Winner: {this.props.ctx.gameover}</div>;
    }

    const cellStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
    };

    let tbody = [];
    for (let i = 0; i < 5; i++) {
      let cells = []
      for (let j = 0; j < 4; j++) {
        const id = 5* i +j;
        cells.push(
          <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
            {this.props.G.cells[id]}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    );
  }
}


////////////////////////
const App = Client({
 game: TicTacToe,
 board: TicTacToeBoard
  });

export default App;