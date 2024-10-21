// components/UserLayout.tsx
import React, { ReactNode } from 'react';
import LeftSideBar from './LeftSideBar';
import Navbar from '@/components/Navbar';



interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children}) => {
  return (
    <main className="flex">
    <aside className="max-h-full sticky top-0 bottom-0 z-50">
      <LeftSideBar/>
    </aside>
    <main className="w-full">
      <nav className="w-full sticky top-0 z-40">{children}</nav>
    </main>
  </main>
  );
};

export default UserLayout;
