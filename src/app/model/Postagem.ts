import { Tema } from "./Tema";
import { Usuario } from "./Usuario";

export class Postagem{
    public id: number;
    public titulo: string;
    public texto: string;
    public dataAtual: Date;
    public foto: string;
    public tema: Tema;
    public usuario: Usuario;
    
}