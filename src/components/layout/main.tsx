import React from "react";

// import { Container } from './styles';
import { Menu } from "./menu";
import { Page } from "./page";

type Props = {
  children: JSX.Element;
};

const Main: React.FC<Props> = ({ children }: Props) => {
  return (
    <Page>
      <Menu />
      <div className="flex-auto">{children}</div>
    </Page>
  );
};

export default Main;
