type Props = {
  hasNotification?: number;
  children: JSX.Element;
};

const Icon: React.FC<Props> = ({ hasNotification, children }: Props) => {
  return (
    <div className="flex relative h-16 w-16 justify-center items-center">
      {children}
      {!!hasNotification && (
        <div className="absolute top-0 right-0 mr-3 mt-3 bg-red-500 w-4 h-4 text-xs text-white rounded-full text-center">
          {hasNotification}
        </div>
      )}
    </div>
  );
};

export default Icon;
