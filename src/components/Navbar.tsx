import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  return (
    <nav className="fixed w-full h-20 shadow-xl bg-slate-100">
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-14 xl:px-10">
        <div className='cursor-pointer'>Logo</div>
        <div>
          <ul className="flex gap-6 items-center cursor-pointer ">
            <li className='hidden md:flex'>Banquet Halls</li>
            <li className='hidden md:flex'>Caterer</li>
            <li className='hidden md:flex'>Decorators</li>
            <li className='hidden md:flex'>Photographers</li>
            <li>
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
      <div className='bottom-0 w-full h-20 shadow-xl bg-slate-100 z-50 fixed md:hidden' style={{ boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)' }}>
        <ul className='flex justify-between items-center h-full text-sm px-4'>
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
