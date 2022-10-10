import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/login";

//User
import Tarefa from "../pages/tarefa";

//Admin
import UsuarioAdmin from "../pages/admin/usuario";
import UsuarioEditarAdmin from "../pages/admin/usuario/editar";
import TarefaAdmin from "../pages/admin/tarefa";
import TarefaEditarAdmin from "../pages/admin/tarefa/editar";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
}: PrivateRouteProps) => {
  const isAuth = !!localStorage.getItem("token");
  if (isAuth) {
    return <>{children}</>;
  }
  return <Navigate to="/login" replace />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* User routes */}
        <Route
          path="/tarefa"
          element={
            <PrivateRoute>
              <Tarefa />
            </PrivateRoute>
          }
        />
        {/* Admin routes */}
        <Route
          path="/admin/usuario"
          element={
            <PrivateRoute>
              <UsuarioAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/usuario/editar"
          element={
            <PrivateRoute>
              <UsuarioEditarAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/tarefa"
          element={
            <PrivateRoute>
              <TarefaAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/tarefa/editar"
          element={
            <PrivateRoute>
              <TarefaEditarAdmin />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
