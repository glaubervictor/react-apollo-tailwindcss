import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import InputMask from "react-input-mask";
import { format, parse } from "date-fns";
import * as yup from "yup";
import { Usuario } from "../../../models/Usuario";
import Main from "../../../components/layout/main";

const USUARIO_ALL = gql`
  query UsuarioAll {
    usuario {
      all {
        id
        email
        pessoa {
          nome
        }
      }
    }
  }
`;

const TAREFA_CRIAR = gql`
  mutation TarefaCriar(
    $usuarioId: ID!
    $mensagem: String!
    $dataLimite: Date!
  ) {
    tarefa {
      create(
        input: {
          usuarioId: $usuarioId
          mensagem: $mensagem
          dataLimite: $dataLimite
        }
      ) {
        usuarioId
        mensagem
        dataLimite
      }
    }
  }
`;

const TarefaEditarPage = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [resultado, setarResultado] = useState<Usuario[]>([]);

  useQuery(USUARIO_ALL, {
    onCompleted: (data) => {
      if (data) {
        setarResultado(data?.usuario?.all || []);
      }
    },
  });

  const [create] = useMutation(TAREFA_CRIAR);

  const formik = useFormik({
    initialValues: {
      usuarioId: "",
      mensagem: "",
      dataLimite: "",
    },
    validationSchema: yup.object().shape({
      usuarioId: yup.string().required("Campo Obrigatório"),
      mensagem: yup.string().required("Campo Obrigatório"),
      dataLimite: yup.string().required("Campo Obrigatório"),
    }),
    onSubmit: (values, actions) => {
      const dataLimite = format(
        parse(values.dataLimite, "dd/MM/yyyy", new Date()),
        "yyyy-MM-dd"
      );
      create({
        variables: { ...values, dataLimite },
      })
        .then((resultado) => {
          if (!!resultado.data) {
            actions.resetForm();
            setShowMessage(true);
          }
        })
        .catch(() => {
          //actions.resetForm();
        });

      actions.setSubmitting(false);
    },
  });

  return (
    <Main>
      <div className="w-full">
        <div className="p-12 h-20 bg-gray-100 border-b border-gray-200">
          <h1 className="font-bold text-xl font-flama-book">Nova Tarefa</h1>
        </div>
        <div className="p-12">
          {showMessage && (
            <div
              className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
              role="alert"
            >
              <span className="font-medium">Sucesso!</span> Registro salvo!
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <div>
                <label className="block">Usuário</label>
                <select
                  name="usuarioId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.usuarioId}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option key={-1} value="">
                    Selecione...
                  </option>
                  {resultado.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.pessoa.nome} ({item.email})
                    </option>
                  ))}
                </select>
                {!!formik.errors.usuarioId && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.usuarioId}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Mensagem</label>
                <input
                  name="mensagem"
                  onChange={formik.handleChange}
                  value={formik.values.mensagem}
                  type="text"
                  placeholder="Mensagem"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.mensagem && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.mensagem}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Data Limite</label>
                <InputMask
                  name="dataLimite"
                  mask="99/99/9999"
                  onChange={formik.handleChange}
                  value={formik.values.dataLimite}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.dataLimite && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.dataLimite}
                  </p>
                )}
              </div>
              <div className="flex items-baseline justify-between">
                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Main>
  );
};

export default TarefaEditarPage;
