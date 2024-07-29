// components/UserLayout.tsx
import React, { ReactNode } from 'react';
import LeftSideBar from './LeftSideBar';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className='flex max-lg:flex-col'>
      <LeftSideBar />
      <div className='flex-1'>
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
