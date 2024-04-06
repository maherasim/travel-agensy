import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { FiX, FiHome, FiGrid, FiInbox, FiUsers, FiBox, FiLogIn, FiUserPlus, FiUser, FiChevronDown } from 'react-icons/fi';
import { AiOutlineClose } from "react-icons/ai";
import { GrMenu, GrServices } from "react-icons/gr";
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function Authenticated({ user, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
    const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false);
    const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
    const [isServiceIconOrange, setIsServiceIconOrange] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleServiceDropdown = () => {
        setIsServiceDropdownOpen(!isServiceDropdownOpen);
        setIsServiceIconOrange(!isServiceIconOrange); // Toggle the color of the service icon
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-gradient-to-r from-blue-300 to-purple-400 border-b border-orange-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Left side */}
                        <div className="flex items-center">
                            {/* Add your content here */}
                        </div>

                        {/* Logo */}
                        <div className="flex items-center justify-center">
                            <Link href="/">
                                <img className="block h-9 w-auto fill-current text-orange-500" src={'https://cdn.durable.co/blocks/25Kh43IltNsfqC64MMri5Ug3o16Jw88prgnzyLsk8SQQJJwsGBw9S1X7jCS7vz2S.png'} alt="Logo" />
                            </Link>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center">
                            {/* Toggle Button */}
                            {!isOpen && (
                                <button
                                    className="text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-medium rounded-lg text-sm px-4 py-2 bg-red-500 mr-4"
                                    type="button"
                                    onClick={toggleSidebar}
                                >
                                    <GrMenu />
                                    <span className="sr-only">Open menu</span>
                                </button>
                            )}

                            {/* User Dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-orange-500 bg-white hover:text-orange-500 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {user.name}
                                        <svg
                                            className="ml-2 -me-0.5 h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <ResponsiveNavLink href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-orange-500 hover:bg-orange-500">
                                        Log Out
                                    </ResponsiveNavLink>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}

            <div
                id="sidenav-main"
                className={`navbar-vertical fixed top-0 left-0 z-50 w-64 h-full mb-4 p-3 overflow-y-auto transition-transform ${isOpen ? '' : '-translate-x-full'} bg-black border-b border-orange-500 rounded-r-3xl`}
                tabIndex="-1"
                aria-labelledby="drawer-navigation-label"
            >
                {/* Menu Items */}
                <ul className="space-y-3 font-medium">
                    {/* Dashboard */}
                    <li className="p-0">
                        <Link href="/dashboard" className="flex items-center p-3 rounded-lg text-white hover:bg-orange-500">
                            <FiHome className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                            Dashboard
                        </Link>
                    </li>
                    {user.role_id === 2 && (
                    <li className="p-0">
                        <Link href="/services/form" className="flex items-center p-3 rounded-lg text-white hover:bg-orange-500">
                            <FiHome className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                            Services Form
                        </Link>
                    </li>
                    )}
                         {user.role_id === 2 && (
                    <li className="p-0">
                        <Link href="/services/form/fetch" className="flex items-center p-3 rounded-lg text-white hover:bg-orange-500">
                            <FiHome className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                          View  Services Form
                        </Link>
                    </li>
                    )}

                    {/* Clients Dropdown */}
                    {user.role_id === 1 && (
                    <li className="relative p-0">
                        <button
                            onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                            className={`flex items-center justify-between p-3 rounded-lg text-white focus:outline-none ${isClientDropdownOpen ? 'bg-orange-500' : 'hover:bg-orange-500'}`}
                        >
                            <span className="flex items-center">
                                <FiUsers className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                                Clients
                            </span>
                            <FiChevronDown className={`w-5 h-5 transition-transform ${isClientDropdownOpen ? 'transform rotate-180' : ''}`} />
                        </button>
                        {isClientDropdownOpen && (
                            <ul className="ml-5 space-y-2">
                                <li className="p-0">
                                    <Link href="/client/register" className="flex items-center p-2 rounded-lg text-white hover:bg-orange-500">
                                        <FiUserPlus className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                                        Add Client
                                    </Link>
                                </li>
                                <li className="p-0">
                                    <Link href="/client/list" className="flex items-center p-2 rounded-lg text-white hover:bg-orange-500">
                                        <FiUsers className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                                        View Clients
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
  )}
                    {/* Vendors Dropdown */}
                    {user.role_id === 1 && (
                    <li className="relative p-0">
                        <button
                            onClick={() => setIsVendorDropdownOpen(!isVendorDropdownOpen)}
                            className={`flex items-center justify-between p-3 rounded-lg text-white focus:outline-none ${isVendorDropdownOpen ? 'bg-orange-500' : 'hover:bg-orange-500'}`}
                        >
                            <span className="flex items-center">
                                <FiUser className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                                Vendors
                            </span>
                            <FiChevronDown className={`w-5 h-5 transition-transform ${isVendorDropdownOpen ? 'transform rotate-180' : ''}`} />
                        </button>
                        {isVendorDropdownOpen && (
                            <ul className="ml-5 space-y-2">
                                <li className="p-0">
                                    <Link href="/vendor/register" className="flex items-center p-2 rounded-lg text-white hover:bg-orange-500">
                                        <FiUserPlus className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                                        Add Vendor
                                    </Link>
                                </li>
                                <li className="p-0">
                                    <Link href="/vendor/list" className="flex items-center p-2 rounded-lg text-white hover:bg-orange-500">
                                        <FiUsers className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                                        View Vendors
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
)}
                    {/* Service Requests Dropdown */}
                    {user.role_id === 1 && (
                    <li className="relative p-0">
                        <button
                            onClick={toggleServiceDropdown}
                            className={`flex items-center justify-between p-3 rounded-lg text-white focus:outline-none ${isServiceDropdownOpen ? 'bg-orange-500' : 'hover:bg-orange-500'}`}
                        >
                            <GrServices className="w-6 h-6 mr-2" style={{ fill: isServiceIconOrange ? 'orange' : 'white' }} />
                            Service Requests
                            <FiChevronDown className={`w-5 h-5 ml-auto transition-transform ${isServiceDropdownOpen ? 'transform rotate-180' : ''}`} />
                        </button>
                        {isServiceDropdownOpen && (
                            <ul className="ml-5 space-y-2">
                                <li className="p-0">
                                    <Link href="/services/form/fetch" className="flex items-center p-2 rounded-lg text-white hover:bg-orange-500">
                                        <GrServices className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                                        Service Form
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    )}
                    {/* New Menu Options */}
                    
                    {user.role_id === 1 && (
                    <li className="p-0">
                        <Link href="/completed/request" className="flex items-center p-3 rounded-lg text-white hover:bg-orange-500">
                            <FiGrid className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                            Completed Request
                        </Link>
                    </li>
                    )}
                  
                  {user.role_id === 1 && (
                    <li className="p-0">
                        <Link href="/payment" className="flex items-center p-3 rounded-lg text-white hover:bg-orange-500">
                            <FiInbox className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                            Payment
                        </Link>
                    </li>
                   
                  )}
                     {user.role_id === 1 && (
                    <li className="p-0">
                        <Link href="/billing" className="flex items-center p-3 rounded-lg text-white hover:bg-orange-500">
                            <FiInbox className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                            Billing
                        </Link>
                    </li>
                     )}
                   
                   {user.role_id === 1 && (
                    <li className="p-0">
                        <Link href="/role" className="flex items-center p-3 rounded-lg text-white hover:bg-orange-500">
                            <FiInbox className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                            Role
                        </Link>
                    </li>
                   )}
                    {user.role_id === 1 && (
                    <li className="p-0">
                        <Link href="/sales" className="flex items-center p-3 rounded-lg text-white hover:bg-orange-500">
                            <FiInbox className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                            Sales
                        </Link>
                    </li>)}
                    
                    <li className="p-0">
                        <Link href="/logout" className="flex items-center p-3 rounded-lg text-white hover:bg-orange-500">
                            <FiLogIn className="w-6 h-6 mr-2" style={{ fill: 'orange' }} />
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Main content */}
            <main className={`main-content-1 border-radius-lg z-10 ${isOpen ? 'pl-64' : 'pl-0'}`}>
                {children}
            </main>
        </div>
    );
}
