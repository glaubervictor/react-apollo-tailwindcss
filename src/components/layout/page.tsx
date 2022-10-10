import React from 'react';

type Props = {
  children: JSX.Element[];
};

export const Page: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="flex flex-row h-screen">
      {React.Children.map(children, (child) => (
        <>{child}</>
      ))}
    </div>
  );
};
