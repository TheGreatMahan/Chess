import React, {useState, useEffect} from 'react';
import { Type, Color } from './domain/Cell';
import './App.css';
import { Piece } from './domain/Piece';
import PieceComponent from './components/PieceComponente/PieceComponent';

const WHITE_ROOK: Piece = { Color: Color.WHITE, Type: Type.ROOK };
const WHITE_KNIGHT: Piece = { Color: Color.WHITE, Type: Type.KNIGHT};
const WHITE_BISHOP: Piece = { Color: Color.WHITE, Type: Type.BISHOP};
const WHITE_QUEEN: Piece = { Color: Color.WHITE, Type: Type.QUEEN};
const WHITE_KING: Piece = { Color: Color.WHITE, Type: Type.KING};
const WHITE_PAWN: Piece = { Color: Color.WHITE, Type: Type.PAWN};

const EMPTY: Piece = new Piece();

const BLACK_ROOK: Piece = { Color: Color.BLACK, Type: Type.ROOK };
const BLACK_KNIGHT: Piece = { Color: Color.BLACK, Type: Type.KNIGHT};
const BLACK_BISHOP: Piece = { Color: Color.BLACK, Type: Type.BISHOP};
const BLACK_QUEEN: Piece = { Color: Color.BLACK, Type: Type.QUEEN};
const BLACK_KING: Piece = { Color: Color.BLACK, Type: Type.KING};
const BLACK_PAWN: Piece = { Color: Color.BLACK, Type: Type.PAWN};

const gameBeginning: Piece[][] = [
  [BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_QUEEN, BLACK_KING, BLACK_BISHOP, BLACK_KNIGHT, BLACK_ROOK],
  [BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, WHITE_QUEEN, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN],
  [WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_QUEEN, WHITE_KING, WHITE_BISHOP, WHITE_KNIGHT, WHITE_ROOK]
];

class Location{
  row: number = 0;
  collumn: number = 0;
  
  constructor(row: number, collumn: number){
    this.row = row;
    this.collumn = collumn;
  }
}

function App() {
  const [board, setBoard] = useState<Piece[][]>(gameBeginning);
  const [selectedPiece, setSelectedPiece] = useState<Piece|undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<Location|undefined>(undefined);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(()=>{
    console.log(options);
  },[options]);

  const pieceClicked = (row: number, collumn: number): void =>{
    const piece: Piece = structuredClone(board[row][collumn]);
    const location: Location = new Location(row, collumn);
    
    const possibilities: Location[] = getAllPossibilitiesByTypeAndLocation(piece, location);

    let possibilitiesStrings: string[] = possibilities.map((loc: Location) => {
      return `${loc.row}-${loc.collumn}`;
    });
    
    setOptions([...possibilitiesStrings]);
  }

  const getAllPossibilitiesByTypeAndLocation = (piece: Piece, location: Location) => {
    let possibilities: Location[] = [];
    if(piece.Type === Type.ROOK){
      possibilities = getPossibilitiesForRook(piece, location);
    }
    else if(piece.Type === Type.KNIGHT){
      possibilities = getPossibilitiesForKnight(piece, location);
    }
    else if(piece.Type === Type.BISHOP){
      possibilities = getPossibilitiesForBishop(piece, location);
    }
    else if(piece.Type === Type.QUEEN){
      possibilities = getPossibilitiesForQueen(piece, location);
    }
    else if(piece.Type === Type.KING){
      possibilities = getPossibilitiesForKing(piece, location);
    }
    else if(piece.Type === Type.PAWN){
      possibilities = getPossibilitiesForPawn(piece, location);
    }

    return possibilities;
  }

  const getPossibilitiesForRook = (piece: Piece, location: Location) : Location[] => {
    let possibilities: Location[] = [];

    const y: number = location.row;
    const x: number = location.collumn;
    const color: Color = piece.Color;

    for(let i = y - 1; i >= 0; i--){
      const currentCell: Piece = board[i][x];
      const currentLocation = new Location(i, x);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }
    for(let i = y + 1; i < 8; i++){
      const currentCell: Piece = board[i][x];
      const currentLocation = new Location(i, x);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }
    for(let i = x - 1; i >= 0; i--){
      const currentCell: Piece = board[y][i];
      const currentLocation = new Location(y, i);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }
    for(let i = x + 1; i < 8; i++){
      const currentCell: Piece = board[y][i];
      const currentLocation = new Location(y, i);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }

    return possibilities;
  } 

  const getPossibilitiesForKnight = (piece: Piece, location: Location) : Location[] => {
    const y: number = location.row;
    const x: number = location.collumn;
    const color: Color = piece.Color;

    let locations: Location[] = [];

    locations.push(new Location(y+2, x+1));
    locations.push(new Location(y+2, x-1));    
    locations.push(new Location(y-2, x+1));
    locations.push(new Location(y-2, x-1));
    locations.push(new Location(y+1, x+2));
    locations.push(new Location(y-1, x+2));    
    locations.push(new Location(y+1, x-2));
    locations.push(new Location(y-1, x-2));

    locations = locations.filter((loc: Location) => {
      return loc.row >= 0 && loc.row <= 7 && loc.collumn >= 0 && loc.collumn <=7 && board[loc.row][loc.collumn].Color !== color
    });

    return locations;
  }

  const getPossibilitiesForBishop = (piece: Piece, location: Location) : Location[] => {
    let possibilities: Location[] = [];

    const y: number = location.row;
    const x: number = location.collumn;
    const color: Color = piece.Color;

    for(let i = x+1; i < 8; i++){
      let difference = i - x;

      if(difference + x > 7 || difference + y > 7)
        break;
      const currentCell: Piece = board[difference + y][difference + x];
      const currentLocation: Location = new Location(difference + y, difference + x);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }
    for(let i = x+1; i < 8; i++){
      let difference = i - x;

      if(difference + x > 7 || y - difference < 0)
        break;
      const currentCell: Piece = board[y - difference][difference + x];
      const currentLocation: Location = new Location(y - difference, difference + x);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }
    for(let i = x-1; i >= 0; i--){
      let difference = x - i;

      if(x - difference < 0 || difference + y > 7)
        break;
      const currentCell: Piece = board[difference + y][x - difference];
      const currentLocation: Location = new Location(difference + y, x - difference);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }
    for(let i = x-1; i >= 0; i--){
      let difference = x - i;

      if(x - difference < 0 ||  y - difference < 0)
        break;
      const currentCell: Piece = board[y - difference][x - difference];
      const currentLocation: Location = new Location(y - difference, x - difference);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }

    return possibilities;
  }

  const getPossibilitiesForQueen = (piece: Piece, location: Location) : Location[] => {
    let possibilities: Location[] = [];

    const y: number = location.row;
    const x: number = location.collumn;
    const color: Color = piece.Color;

    for(let i = x+1; i < 8; i++){
      let difference = i - x;

      if(difference + x > 7 || difference + y > 7)
        break;
      const currentCell: Piece = board[difference + y][difference + x];
      const currentLocation: Location = new Location(difference + y, difference + x);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }
    for(let i = x+1; i < 8; i++){
      let difference = i - x;

      if(difference + x > 7 || y - difference < 0)
        break;
      const currentCell: Piece = board[y - difference][difference + x];
      const currentLocation: Location = new Location(y - difference, difference + x);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }
    for(let i = x-1; i >= 0; i--){
      let difference = x - i;

      if(x - difference < 0 || difference + y > 7)
        break;
      const currentCell: Piece = board[difference + y][x - difference];
      const currentLocation: Location = new Location(difference + y, x - difference);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }
    for(let i = x-1; i >= 0; i--){
      let difference = x - i;

      if(x - difference < 0 ||  y - difference < 0)
        break;
      const currentCell: Piece = board[y - difference][x - difference];
      const currentLocation: Location = new Location(y - difference, x - difference);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }
    for(let i = y - 1; i >= 0; i--){
      const currentCell: Piece = board[i][x];
      const currentLocation = new Location(i, x);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }
    for(let i = y + 1; i < 8; i++){
      const currentCell: Piece = board[i][x];
      const currentLocation = new Location(i, x);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }
    for(let i = x - 1; i >= 0; i--){
      const currentCell: Piece = board[y][i];
      const currentLocation = new Location(y, i);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }
    for(let i = x + 1; i < 8; i++){
      const currentCell: Piece = board[y][i];
      const currentLocation = new Location(y, i);
      if(currentCell.Color === color){
        break;
      }
      else if(currentCell.Type !== Type.EMPTY){
        possibilities.push(currentLocation);
        break;
      }
      else{
        possibilities.push(currentLocation);
      }
    }

    return possibilities;
  }

  const getPossibilitiesForKing = (piece: Piece, location: Location) : Location[] => {
    let possibilities: Location[] = [];

    const y: number = location.row;
    const x: number = location.collumn;
    const color: Color = piece.Color;

    possibilities.push(new Location(y ,x + 1));
    possibilities.push(new Location(y + 1, x + 1));
    possibilities.push(new Location(y - 1, x + 1));
    possibilities.push(new Location(y, x - 1));
    possibilities.push(new Location(y + 1, x - 1));
    possibilities.push(new Location(y - 1, x - 1));
    possibilities.push(new Location(y + 1, x));
    possibilities.push(new Location( y - 1, x));

    possibilities = possibilities.filter((loc:Location) => {
      return loc.collumn >= 0 && loc.collumn <= 7 && loc.row >= 0 && loc.row <=7 && board[loc.row][loc.collumn].Color !== color
    });

    return possibilities;
  }

  const getPossibilitiesForPawn = (piece: Piece, location: Location) : Location[] => {
    let possibilities: Location[] = [];
    
    const y: number = location.row;
    const x: number = location.collumn;
    const color: Color = piece.Color;
    const direction: number = color === Color.BLACK ? 1 : -1;

    if(color === Color.BLACK && y === 1 && board[2][x].Type === Type.EMPTY && board[3][x].Type === Type.EMPTY){
      possibilities.push(new Location(3, x));
    }
    if(color === Color.WHITE && y === 6 && board[5][x].Type === Type.EMPTY && board[4][x].Type === Type.EMPTY){
      possibilities.push(new Location(4, x));
    }

    if(x + 1 <= 7 && board[y+direction][x+1].Color !== color && board[y+direction][x+1].Color !== Color.EMPTY){
      possibilities.push(new Location(y+direction, x+1));
    }
    if(x - 1 >= 0 && board[y+direction][x-1].Color !== color && board[y+direction][x-1].Color !== Color.EMPTY){
      possibilities.push(new Location(y+direction, x-1));
    }
    if(y + direction <= 7 && y + direction >= 0 && board[y+direction][x].Color === Color.EMPTY){
      possibilities.push(new Location(y+direction, x));
    }


    return possibilities;
  }

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
                        <div className={ `${(rowNumber + collNumber) % 2 === 0 ? 'black': 'white'}${options.includes(`${rowNumber}-${collNumber}`) ? '-green': ''}`} key={`${rowNumber}-${collNumber}`} onClick={()=>{pieceClicked(rowNumber, collNumber)}}>
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
