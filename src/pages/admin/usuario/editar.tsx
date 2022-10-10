import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import InputMask from "react-input-mask";
import { format, parse } from "date-fns";
import { useFormik } from "formik";
import * as yup from "yup";
import Main from "../../../components/layout/main";

const USUARIO_EDITAR = gql`
  mutation UsuarioEditar(
    $email: String!
    $senha: String!
    $superUsuario: Boolean!
    $nome: String!
    $dataNascimento: Date!
    $cep: String!
    $logradouro: String!
    $numero: String!
    $complemento: String!
    $bairro: String!
    $cidade: String!
    $telefone: String!
    $celular: String!
    $fotoUrl: String!
  ) {
    usuario {
      create(
        input: {
          email: $email
          senha: $senha
          superUsuario: $superUsuario
          pessoa: {
            nome: $nome
            dataNascimento: $dataNascimento
            cep: $cep
            logradouro: $logradouro
            numero: $numero
            complemento: $complemento
            bairro: $bairro
            cidade: $cidade
            telefone: $telefone
            celular: $celular
            fotoUrl: $fotoUrl
          }
        }
      ) {
        id
        email
        dataCadastro
        pessoa {
          nome
        }
      }
    }
  }
`;

const UsuarioEditarPage = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [create] = useMutation(USUARIO_EDITAR);

  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
      superUsuario: false,
      nome: "",
      dataNascimento: "",
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      telefone: "",
      celular: "",
      fotoUrl: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Campo Obrigatório"),
      senha: yup.string().required("Campo Obrigatório"),
      nome: yup.string().required("Campo Obrigatório"),
      dataNascimento: yup.string().required("Campo Obrigatório"),
      cep: yup.string().required("Campo Obrigatório"),
      logradouro: yup.string().required("Campo Obrigatório"),
      numero: yup.string().required("Campo Obrigatório"),
      complemento: yup.string().required("Campo Obrigatório"),
      bairro: yup.string().required("Campo Obrigatório"),
      cidade: yup.string().required("Campo Obrigatório"),
      telefone: yup.string().required("Campo Obrigatório"),
      celular: yup.string().required("Campo Obrigatório"),
      //fotoUrl: yup.string().required("Campo Obrigatório"),
    }),
    onSubmit: (values, actions) => {
      const dataNascimento = format(
        parse(values.dataNascimento, "dd/MM/yyyy", new Date()),
        "yyyy-MM-dd"
      );
      create({
        variables: { ...values, dataNascimento },
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
          <h1 className="font-bold text-xl font-flama-book">Novo Usuário</h1>
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
              <div className="py-4 font-bold text-md font-flama-medium">
                Dados de acesso
              </div>
              <div className="mt-4">
                <label className="block">E-mail</label>
                <input
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="text"
                  placeholder="E-mail"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.email && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Senha</label>
                <input
                  name="senha"
                  onChange={formik.handleChange}
                  value={formik.values.senha}
                  type="password"
                  placeholder="Senha"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.senha && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.senha}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block">É Gerente</label>
                <input
                  name="superUsuario"
                  onChange={formik.handleChange}
                  checked={formik.values.superUsuario}
                  type="checkbox"
                  className="px-4 py-2 mt-2 border rounded-md"
                />
              </div>
              <div className="py-4 mt-4 font-bold text-md font-flama-medium">
                Dados pessoais
              </div>
              <div className="mt-4">
                <label className="block">Nome</label>
                <input
                  name="nome"
                  onChange={formik.handleChange}
                  value={formik.values.nome}
                  type="text"
                  placeholder="Nome"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.nome && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.nome}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Data de Nascimento</label>
                <InputMask
                  name="dataNascimento"
                  mask="99/99/9999"
                  onChange={formik.handleChange}
                  value={formik.values.dataNascimento}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.dataNascimento && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.dataNascimento}
                  </p>
                )}
              </div>
              <div className="py-4 mt-4 px font-bold text-md font-flama-medium">
                Endereço
              </div>
              <div className="mt-4">
                <label className="block">CEP</label>
                <InputMask
                  name="cep"
                  mask="99999-999"
                  onChange={formik.handleChange}
                  value={formik.values.cep}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.cep && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.cep}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Endereço</label>
                <input
                  name="logradouro"
                  onChange={formik.handleChange}
                  value={formik.values.logradouro}
                  type="text"
                  placeholder="Endereço"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.logradouro && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.logradouro}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Número</label>
                <input
                  name="numero"
                  onChange={formik.handleChange}
                  value={formik.values.numero}
                  type="text"
                  placeholder="Número"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.numero && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.numero}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Complemento</label>
                <input
                  name="complemento"
                  onChange={formik.handleChange}
                  value={formik.values.complemento}
                  type="text"
                  placeholder="Complemento"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.complemento && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.complemento}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Bairro</label>
                <input
                  name="bairro"
                  onChange={formik.handleChange}
                  value={formik.values.bairro}
                  type="text"
                  placeholder="Bairro"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.bairro && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.bairro}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Cidade</label>
                <input
                  name="cidade"
                  onChange={formik.handleChange}
                  value={formik.values.cidade}
                  type="text"
                  placeholder="Cidade"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.cidade && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.cidade}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Telefone</label>
                <InputMask
                  name="telefone"
                  mask="(99) 999999999"
                  onChange={formik.handleChange}
                  value={formik.values.telefone}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.telefone && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.telefone}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Celular</label>
                <InputMask
                  name="celular"
                  mask="(99) 999999999"
                  onChange={formik.handleChange}
                  value={formik.values.celular}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {!!formik.errors.celular && "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formik.errors.celular}
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

export default UsuarioEditarPage;
