import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Tarefa } from "../../../models/Tarefa";
import Main from "../../../components/layout/main";

const PESQUISAR = gql`
  query TarefaPesquisar($index: Int!, $size: Int!) {
    tarefa {
      paged(index: $index, size: $size) {
        items {
          mensagem
          dataLimite
          finalizada
          usuario {
            email
            pessoa {
              nome
            }
          }
        }
        pageCount
        size
        totalCount
      }
    }
  }
`;

const TarefaPage = () => {
  const [resultado, setarResultado] = useState<Tarefa[]>([]);
  const [total, setarTotal] = useState(0);
  const [{ index, size }, setarPaginacao] = useState({
    index: 0,
    size: 50,
  });

  const { loading } = useQuery(PESQUISAR, {
    variables: { index, size },
    onCompleted: (data) => {
      if (data) {
        setarResultado(data?.tarefa?.paged?.items || []);
        setarTotal(data?.tarefa?.paged?.totalCount || 0);
      }
    },
    onError: () => {},
  });

  return (
    <Main>
      <div className="w-full">
        <div className="p-12 h-20 bg-gray-100 border-b border-gray-200">
          <h1 className="font-bold text-xl font-flama-book">Tarefas</h1>
        </div>
        <div className="p-12">
          <table className="w-full table-auto text-left border border-spacing-4 font-flama-light">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="py-3 px-6">Nome</th>
                <th className="py-3 px-6">E-mail</th>
                <th className="py-3 px-6">Mensagem</th>
                <th className="py-3 px-6">Data Limite</th>
                <th className="py-3 px-6">Finalizada</th>
                <th className="py-3 px-6">Ações</th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                <>
                  {resultado.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-6">{item.usuario.pessoa.nome}</td>
                      <td className="py-3 px-6">{item.usuario.email}</td>
                      <td className="py-3 px-6">{item.mensagem}</td>
                      <td className="py-3 px-6">{item.dataLimite}</td>
                      <td className="py-3 px-6">
                        {item.finalizada ? "Sim" : "Não"}
                      </td>
                      <td className="py-3 px-6"></td>
                    </tr>
                  ))}
                  <tr className="border-t-2">
                    <td className="py-3 px-6 bg-gray-50" colSpan={6}>
                      <span className="font-flama-book">Total:</span> {total}
                    </td>
                  </tr>
                </>
              ) : (
                <tr className="border-t-2">
                  <td className="py-3 px-6 bg-gray-50" colSpan={6}>
                    Carregando...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Main>
  );
};

export default TarefaPage;
