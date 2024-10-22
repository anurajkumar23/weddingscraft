"use client"
// components/UserLayout.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import LeftSideBar from './LeftSideBar';




interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <main className="relative flex flex-col md:flex-row">
      <aside className={`${
          isMobile ? 'fixed inset-y-0 left-0 z-50 ' : 'sticky top-0 max-h-full'
        } transition-all duration-300 ease-in-out`}
      >
        <LeftSideBar />
      </aside>
      <main className="flex-grow">
        <div className="p-4 py-8">{children}</div>
      </main>
    </main>
  );
};

export default UserLayout;
