import { Type, Color } from "./Cell";

export class Piece{
    Color: Color = Color.EMPTY;
    Type: Type = Type.EMPTY;

    constructor(type: Type = Type.EMPTY, color: Color = Color.EMPTY){
        this.Type = type;
        this.Color = color;
    }
}