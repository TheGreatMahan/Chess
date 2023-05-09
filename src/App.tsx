import React, {useState} from 'react';
import { Cell, Color } from './domain/Cell';
import './App.css';
import { Piece } from './domain/Piece';

const WHITE_ROOK: Piece = { Color: Color.WHITE, Cell: Cell.ROOK };
const WHITE_KNIGHT: Piece = { Color: Color.WHITE, Cell: Cell.KNIGHT};
const WHITE_BISHOP: Piece = { Color: Color.WHITE, Cell: Cell.BISHOP};
const WHITE_QUEEN: Piece = { Color: Color.WHITE, Cell: Cell.QUEEN};
const WHITE_KING: Piece = { Color: Color.WHITE, Cell: Cell.KING};
const WHITE_PAWN: Piece = { Color: Color.WHITE, Cell: Cell.PAWN};

const EMPTY: Piece = new Piece();

const BLACK_ROOK: Piece = { Color: Color.BLACK, Cell: Cell.ROOK };
const BLACK_KNIGHT: Piece = { Color: Color.BLACK, Cell: Cell.KNIGHT};
const BLACK_BISHOP: Piece = { Color: Color.BLACK, Cell: Cell.BISHOP};
const BLACK_QUEEN: Piece = { Color: Color.BLACK, Cell: Cell.QUEEN};
const BLACK_KING: Piece = { Color: Color.BLACK, Cell: Cell.KING};
const BLACK_PAWN: Piece = { Color: Color.BLACK, Cell: Cell.PAWN};

const gameBeginning: Piece[][] = [
];

function App() {
  const [board, setBoard] = useState<Cell[][]>();

  return (
    <div className="App">
      <div className='chess-background'>
        <div className='chess-board'>

        </div>
      </div>
    </div>
  );
}

export default App;
