"use client";
import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/helpers/context/authContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dropdown, Space, message } from "antd";
import { FiLock, FiLogOut, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const {currentUser,signout}=useAuth();
  const router=useRouter();
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/program" },
    {name:"Instructors",href:"/instructor"},
  ];
  const handleLogout = () => {
    signout();
    window.location.href = '/';
    toast.success("Logout Successfully");
};
  const items = [
    {
        label: 'Profile',
        icon: <FiUser />,
        key: '1',
        onClick: () => router.push('/admin/settings'),
    },
    {
        label: 'Change Password',
        icon: <FiLock />,
        key: '2',
        onClick: () => router.push('/admin/settings'),
    },
    {
        label: 'Logout',
        icon: <FiLogOut />,
        key: '3',
        onClick: handleLogout,
    },
];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center md:justify-between text-sm gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="w-4 h-4" />
                <span>info@summercamp.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-4 h-4" />
              <span>Pine Lake, Colorado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">SC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Summer Camp</h1>
              <p className="text-xs text-gray-500">Adventure Awaits</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-200"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex gap-4 items-center">
          <div className="flex items-center ">
            {
              currentUser?.email ? (  <Dropdown
                menu={{
                    items,
                }}
            >
                <div className='flex cursor-pointer items-center justify-between gap-2'>
                    <Space className='cursor-pointer'>
                        {currentUser?.image && currentUser.image.trim() ? (
                            <Image
                                src={currentUser.image || '/default.jpg'}
                                alt='user'
                                width={40}
                                height={40}
                                className='h-[25px] w-[25px] rounded-full md:h-[30px] md:w-[30px] lg:h-[40px] lg:w-[40px]'
                            />
                        ) : (
                            <FaUser className='text-lg sm:text-xl' />
                        )}
                    </Space>
                    {/* <p className='text-lg capitalize'>{currentUser?.name || 'N/A'}</p> */}
                </div>
            </Dropdown>):(<Link href="/signup" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-4 py-2 rounded-lg">
              Join Now
            </Link>)
            }
            
          </div>
           {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-orange-100">
          <div className="flex flex-col gap-4 p-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-4 py-2 rounded-lg mt-4">
              Register Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
