"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  MessageCircle,
  Heart,
  Zap,
  Laugh,
  Quote,
  GamepadIcon,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Facts",
    url: "/facts",
    icon: MessageCircle,
  },
  {
    title: "Flirt-Lines",
    url: "/flirt-lines",
    icon: Heart,
  },
  {
    title: "Insult-lines",
    url: "/insult-lines",
    icon: Zap,
  },
  {
    title: "Jokes",
    url: "/jokes",
    icon: Laugh,
  },
  {
    title: "Quotes",
    url: "/quotes",
    icon: Quote,
  },
  {
    title: "Truth Or Dare",
    url: "/truth-or-dare",
    icon: GamepadIcon,
  },
];

export default function CustomSidenav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Handle window resize and initial mobile check
  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setIsCollapsed(isMobileView);
    };

    // Check initial state
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
      setIsCollapsed(true);
    }
  }, [pathname, isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Menu Button - Always visible on mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      )}

      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
          fixed md:static min-h-screen bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out z-40
          ${isCollapsed && !isOpen ? '-translate-x-full md:translate-x-0 md:w-16' : 'translate-x-0 w-64'}
        `}
      >
        {/* Toggle Button - Only visible on desktop */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-6 p-1.5 rounded-full bg-white border border-gray-200 shadow-sm"
          >
            <ChevronRight
              className={`h-4 w-4 text-gray-600 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
        )}

        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className={`
            font-semibold text-gray-800 transition-opacity duration-300
            ${isCollapsed && !isOpen ? 'opacity-0' : 'opacity-100'}
          `}>
            EntertainMe
          </h2>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.url;
            
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`
                  flex items-center px-2 py-2 rounded-lg
                  transition-all duration-200 group
                  ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon className={`
                  h-5 w-5 transition-colors duration-200
                  ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}
                `} />
               
                <span className={`
                  ml-3 truncate transition-all duration-300
                  ${isCollapsed && !isOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                  ${isActive ? 'font-medium' : ''}
                `}>
                  {item.title}
                </span>

                {/* Tooltip for collapsed state - Only on desktop */}
                {isCollapsed && !isMobile && !isOpen && (
                  <div className="
                    absolute left-full ml-2 px-2 py-1
                    bg-gray-900 text-white text-sm rounded
                    opacity-0 group-hover:opacity-100
                    pointer-events-none transition-opacity duration-200
                    whitespace-nowrap
                  ">
                    {item.title}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}