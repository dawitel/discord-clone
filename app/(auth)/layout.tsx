const AuthLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className=" h-full mt-11 flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
