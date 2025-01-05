import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Tractor, Bell, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Marketplace' },
    { path: '/resources', label: 'Resources' },
  ];

  const accountMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: LogOut, label: 'Sign Out', action: () => {
      // Handle sign out logic here
      navigate('/signin');
    }},
  ];

  return (
    <nav className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Tractor className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">FarmVerse</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-green-700 text-white'
                      : 'text-white hover:bg-green-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-green-700">
              <Bell className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="p-2 rounded-full hover:bg-green-700"
              >
                <User className="h-5 w-5" />
              </button>

              {isAccountMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    {accountMenuItems.map((item, index) => (
                      <div key={index}>
                        {item.path ? (
                          <Link
                            to={item.path}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsAccountMenuOpen(false)}
                          >
                            <item.icon className="h-4 w-4 mr-3" />
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            onClick={() => {
                              setIsAccountMenuOpen(false);
                              item.action?.();
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <item.icon className="h-4 w-4 mr-3" />
                            {item.label}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-green-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-green-700 text-white'
                    : 'text-white hover:bg-green-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* Mobile account menu items */}
            <div className="border-t border-green-700 mt-2 pt-2">
              {accountMenuItems.map((item, index) => (
                <div key={index}>
                  {item.path ? (
                    <Link
                      to={item.path}
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-700"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        item.action?.();
                      }}
                      className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-700"
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}