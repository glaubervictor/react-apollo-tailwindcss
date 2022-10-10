import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as yup from "yup";

import AppContext from "../contexts";

import {
  setItem as localStorageSetItem,
  clear as localStorageClear,
} from "../helpers/localStorageControl";
import "../assets/css/global.css";
import { ActionType } from "../contexts/store/appActions";

const LOGIN = gql`
  mutation Autenticacao($email: String!, $senha: String!) {
    autenticacao {
      login(input: { email: $email, senha: $senha }) {
        perfil
        token
        validoAte
      }
    }
  }
`;

const LoginPage = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [login] = useMutation(LOGIN);

  useEffect(() => {
    localStorageClear();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Campo Obrigatório"),
      senha: yup.string().required("Campo Obrigatório"),
    }),
    onSubmit: (values, actions) => {
      login({
        variables: values,
      })
        .then((resultado) => {
          if (!!resultado.data) {
            const { perfil, token } = resultado.data.autenticacao.login;
            localStorageClear();
            localStorageSetItem("token", token);

            dispatch({
              type: ActionType.PROFILE_USER,
              payload: perfil,
            });

            if (perfil === "Gerente") {
              navigate("/admin/usuario");
            } else {
              navigate("/tarefa");
            }
          }
        })
        .catch(() => {
          setShowErrorMessage(true);
          actions.resetForm();
        });

      actions.setSubmitting(false);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-1/5 px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        {showErrorMessage && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <span className="font-medium">Login!</span> Usuário e/ou senha
            inválidos
          </div>
        )}
        <h3 className="text-2xl font-bold text-center">Super Pastel</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block">Email</label>
              <input
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                type="text"
                placeholder="Email"
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
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
