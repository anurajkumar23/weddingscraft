'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/app/authContext'
import SideNavbar from './SideNavbar'

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, setUser } = useAuth()
  const router = useRouter()

  const handleNav = () => {
    setMenuOpen(!menuOpen)
  }

  function handleLogout() {
    localStorage.clear()
    setUser(null)
    router.push("/")
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/Banquet', label: 'Banquet Halls' },
    { href: '/Caterer', label: 'Caterer' },
    { href: '/Decorator', label: 'Decorators' },
    { href: '/Photographer', label: 'Photographers' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/elements/logo.png"
                alt="Dream Wedding Logo"
                width={260}
                height={70}
                className="w-auto h-10 sm:h-14"
                priority
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/seller">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Become a Seller
              </Button>
            </Link>
            {!user ? (
              <Link href="/auth/login">
                <Button className='border p-2 rounded-sm text-blue-500 bg-blue-100 hover:bg-blue-200'>
                  Login /SignUp
                </Button>
              </Link>
            ) : (
              <Avatar onClick={handleNav}>
                <AvatarImage src={user.image} className='object-cover cursor-pointer' alt={user.name} />
                <AvatarFallback>
                  {user.name
                    ? user.name.split(' ').map((word: any[]) => word[0]).join('').toUpperCase()
                    : 'UN'}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="md:hidden flex items-center space-x-3">
            {/* <Link href="/seller">
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Seller
              </Button>
            </Link> */}
            {!user ? (
              <Link href="/auth/login">
                <Button size="sm" className='border rounded-sm text-blue-500 bg-blue-100 hover:bg-blue-200'>
                  Login
                </Button>
              </Link>
            ) : (
              <Avatar onClick={handleNav}>
                <AvatarImage src={user.image} className='object-cover cursor-pointer' alt={user.name} />
                <AvatarFallback>
                  {user.name
                    ? user.name.split(' ').map((word: any[]) => word[0]).join('').toUpperCase()
                    : 'UN'}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </div>
      <SideNavbar menuOpen={menuOpen} handleNav={handleNav} />
    </nav>
  )
}

export default Navbar