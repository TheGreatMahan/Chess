import React, {useState} from 'react';
import { Cell, Color } from './domain/Cell';
import './App.css';
import { Piece } from './domain/Piece';
import PieceComponent from './components/PieceComponente/PieceComponent';

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
  [BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_QUEEN, BLACK_KING, BLACK_BISHOP, BLACK_KNIGHT, BLACK_ROOK],
  [BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN],
  [WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_QUEEN, WHITE_KING, WHITE_BISHOP, WHITE_KNIGHT, WHITE_ROOK]
];

function App() {
  const [board, setBoard] = useState<Piece[][]>(gameBeginning);

  return (
    <div className="App">
      <div className='chess-background'>
        <div className='chess-board'>
          {
            board.map((row: Piece[], rowNumber: number) => {
              return(
                <div className='row' key={`${rowNumber}`}>
                  {
                    row.map((piece: Piece, collNumber: number) => {
                      return(
                        <div className={(rowNumber + collNumber) % 2 === 0 ? 'black': 'white'} key={`${rowNumber}-${collNumber}`}>
                          <PieceComponent piece={piece}/>
                        </div>
                      )
                    })
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
