// components/UserLayout.tsx
import React, { ReactNode } from 'react';
import LeftSideBar from './LeftSideBar';
import Loading from './loading';

interface UserLayoutProps {
  children: ReactNode;
  loading?: boolean;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children, loading = false }) => {
  return (
    <div className='flex max-lg:flex-col'>
      <LeftSideBar />
      <div className='flex-1'>
        {loading ? <Loading/> : children}
      </div>
    </div>
  );
};

export default UserLayout;
