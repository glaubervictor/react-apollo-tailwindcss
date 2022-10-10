import { Usuario } from "./Usuario";

export interface Tarefa {
  id: string;
  mensagem: string;
  dataLimite: string;
  finalizada: boolean;
  usuario: Usuario;
}