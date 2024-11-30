import { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full flex-row justify-center bg-white">
      {children}
    </div>
  );
};
export default RootLayout;
