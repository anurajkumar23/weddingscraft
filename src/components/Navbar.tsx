import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { RiHome3Line } from "react-icons/ri";

const Navbar:React.FC = () => {
  return (
    <nav className="fixed w-full h-20 shadow-xl bg-slate-100 z-50">
      <div className="flex justify-between items-center h-full font-semibold w-full px-4 2xl:px-14 xl:px-10">
        <div className='cursor-pointer'>Logo</div>
        <div>
          <ul className="flex gap-6 items-center cursor-pointer ">
            <li className='hidden md:flex'>
              <Link href="/">Home</Link></li>
            <li className='hidden md:flex'>Banquet Halls</li>
            <li className='hidden md:flex'>Caterer</li>
            <li className='hidden md:flex'>Decorators</li>
            <li className='hidden md:flex'>Photographers</li>
            <li className='border p-2 rounded-sm text-blue-500 bg-blue-100'>
              Login /SignUp
            </li>
            <li>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </li>
          </ul>
        </div>
      </div>
      <div className='font-semibold bottom-0 w-full h-20 shadow-xl bg-slate-100  fixed md:hidden' style={{ boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)' }}>
        <ul className='flex justify-between items-center h-full text-sm px-3'>
          <li>
          <Link href="/">
          <RiHome3Line className="text-2xl w-full items-center"/>
          Home</Link></li>
          <li>Banquet Halls</li>
          <li>Caterer</li>
          <li>Decorators</li>
          <li>Photographers</li>
        </ul>
      </div>

    </nav>
  );
};

export default Navbar;
