import { Pessoa } from "./Pessoa";

export interface Usuario {
  id: string;
  email: string;
  superUsuario: boolean;
  dataCadastro: string;
  pessoa: Pessoa;
}