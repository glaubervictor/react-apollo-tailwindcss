import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Main from "../../../components/layout/main";
import { Usuario } from "../../../models/Usuario";

const USUARIO_PESQUISAR = gql`
  query UsuarioPesquisar($index: Int!, $size: Int!) {
    usuario {
      paged(index: $index, size: $size) {
        items {
          id
          email
          superUsuario
          pessoa {
            nome
          }
        }
        pageCount
        size
        totalCount
      }
    }
  }
`;

const UsuarioPage = () => {
  const [resultado, setarResultado] = useState<Usuario[]>([]);
  const [total, setarTotal] = useState(0);
  const [{ index, size }, setarPaginacao] = useState({
    index: 0,
    size: 50,
  });

  const { loading } = useQuery(USUARIO_PESQUISAR, {
    variables: { index, size },
    onCompleted: (data) => {
      if (data) {
        setarResultado(data?.usuario?.paged?.items || []);
        setarTotal(data?.usuario?.paged?.totalCount || 0);
      }
    },
    onError: () => {},
  });

  return (
    <Main>
      <div className="w-full">
        <div className="p-12 h-20 bg-gray-100 border-b border-gray-200">
          <h1 className="font-bold text-xl font-flama-book">Usuários</h1>
        </div>
        <div className="p-12">
          <table className="w-full table-auto text-left border border-spacing-4 font-flama-light">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="py-3 px-6">E-mail</th>
                <th className="py-3 px-6">Nome</th>
                <th className="py-3 px-6">Perfil</th>
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
                      <td className="py-3 px-6">{item.email}</td>
                      <td className="py-3 px-6">{item.pessoa.nome}</td>
                      <td className="py-3 px-6">
                        {item.superUsuario ? "Gerente" : "Usuário"}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2">
                    <td className="py-3 px-6 bg-gray-50" colSpan={3}>
                      <span className="font-flama-book">Total:</span> {total}
                    </td>
                  </tr>
                </>
              ) : (
                <tr className="border-t-2">
                  <td className="py-3 px-6 bg-gray-50" colSpan={3}>
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

export default UsuarioPage;
