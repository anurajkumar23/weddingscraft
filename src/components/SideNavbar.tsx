
import { AiOutlineClose } from 'react-icons/ai';
import { navLinks } from '@/lib/constants';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '@/app/authContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IsAdminOrSeller } from '@/utils/protect/protect';


interface SideNavbarProps {
    menuOpen: boolean;
    handleNav: () => void;
}


const SideNavbar = ({ menuOpen, handleNav }: any) => {
    const { user, setUser } = useAuth();
    const router = useRouter()


    // if (user?.role === 'admin') {
    //     console.log("😀😀😀😀😀😀😀 Admin access granted");
    //   }

    function handleLogout() {
        localStorage.clear()
        setUser(null)
        router.push("/")
        handleNav();
    }



    return (
        <div>
            <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 backdrop-blur-sm bg-opacity-75 z-50 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={handleNav}>
                <div className={`fixed right-0 top-0 w-[365px] h-full bg-slate-50  ease-in duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
                    <div className='p-4 flex cursor-pointer items-center justify-start mb-4'>
                        <AiOutlineClose size={25} onClick={handleNav} />
                    </div>
                    <Link href="/user/profile"
                        onClick={handleNav}
                    >
                        <div className=" flex flex-col items-center text-center">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>AN</AvatarFallback>
                            </Avatar>
                            <p className="mt-4 font-semibold text-lg">{user?.name}</p>
                            <p className="text-blue-500 cursor-pointer">Click to view profile</p>
                        </div>
                    </Link>
                    <hr className="w-full border-t border-gray-300" />
                    <ul className="p-2 overflow-y-auto pb-60  h-full hide-scrollbar text-black font-medium">
                        <IsAdminOrSeller>
                            <Link
                                href="/user/profile/dashboard"
                                className="p-4 flex w-full justify-start space-x-2  hover:bg-gray-200 hover:rounded-md"
                                onClick={handleNav}
                            >
                                <LayoutDashboard /> <p>Dashboard</p>
                            </Link>
                        </IsAdminOrSeller>
                        {navLinks.map((link, index) => (
                            <div key={link.label}>
                                <Link href={link.url}
                                    // variant="outline"
                                    className="p-4 flex w-full justify-start space-x-2  hover:bg-gray-200 hover:rounded-md"
                                    onClick={handleNav}
                                >
                                    {link.icon}
                                    <span>{link.label}</span>
                                </Link>
                                {index === 3 || index === 5 || index === 6 || index === 9 ? (
                                    <div className='mt-4 pb-4'>
                                        <hr className="w-full border-t border-gray-300" />
                                    </div>
                                ) : null}
                            </div>
                        ))}
                        <div
                            onClick={handleLogout}
                            className={`flex gap-4 p-4 text-body-medium hover:bg-red-100 hover:rounded-md  cursor-pointer "text-grey-1"
                }`}
                        >
                            <LogOut /><p className="cursor-pointer">Logout</p>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideNavbar
