import React, { FC } from "react";
import './PieceComponent.css';
import { Piece } from "../../domain/Piece";
import { Type, Color } from "../../domain/Cell";

const WhiteRook = './pieces/rook/white.png';
const BlackRook = './pieces/rook/black.png';
const WhiteKnight = './pieces/knight/white.png';
const BlackKnight = './pieces/knight/black.png';
const WhiteBishop = './pieces/bishop/white.png';
const BlackBishop = './pieces/bishop/black.png';
const WhiteQueen = './pieces/queen/white.png';
const BlackQueen = './pieces/queen/black.png';
const WhiteKing = './pieces/king/white.png';
const BlackKing = './pieces/king/black.png';
const WhitePawn = './pieces/pawn/white.png';
const BlackPawn = './pieces/pawn/black.png';



interface PieceComponenteProps {
    piece: Piece,
}

const PieceComponent: FC<PieceComponenteProps> = ({ piece }: PieceComponenteProps) => {

    return(
        <div className="piece">
        {
            piece.Type === Type.PAWN && ((piece.Color === Color.WHITE && <img src={WhitePawn} alt={'White Pawn'}/>) || (piece.Color === Color.BLACK && <img src={BlackPawn} alt={'Black Pawn'}/>))
        }
        {
            piece.Type === Type.ROOK && ((piece.Color === Color.WHITE && <img src={WhiteRook} alt={'White Rook'} />) || (piece.Color === Color.BLACK && <img src={BlackRook} alt={'Black Rook'}/>))
        }
        {
            piece.Type === Type.KNIGHT && ((piece.Color === Color.WHITE && <img src={WhiteKnight} alt={'White Knight'}/>) || (piece.Color === Color.BLACK && <img src={BlackKnight} alt={'Black Knight'}/>))
        }
        {
            piece.Type === Type.BISHOP && ((piece.Color === Color.WHITE && <img src={WhiteBishop} alt={'White Bishop'}/>) || (piece.Color === Color.BLACK && <img src={BlackBishop} alt={'Black Bishop'}/>))
        }
        {
            piece.Type === Type.QUEEN && ((piece.Color === Color.WHITE && <img src={WhiteQueen} alt={'White Queen'}/>) || (piece.Color === Color.BLACK && <img src={BlackQueen} alt={'Black Queen'}/>))
        }
        {
            piece.Type === Type.KING && ((piece.Color === Color.WHITE && <img src={WhiteKing} alt={'White King'}/>) || (piece.Color === Color.BLACK && <img src={BlackKing} alt={'Black King'}/>))
        }
        </div>
    )
};

export default PieceComponent;
