"use client";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

type MenuItem = {
  label: string;
  href?: string;
  dropdownOptions?: {
    label: string;
    href: string;
    isParent?: boolean;
  }[];
};

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );

  // Toggle dropdown visibility in mobile menu
  const toggleMobileDropdown = (label: string) => {
    setExpandedMenus((prev) => {
      // If the clicked menu is already open, close it
      if (prev[label]) {
        return {
          ...prev,
          [label]: false,
        };
      }
      // Otherwise, close all menus and open the clicked one
      const newState: Record<string, boolean> = {};
      navLinks.forEach((item) => {
        if (item.dropdownOptions) {
          newState[item.label] = false;
        }
      });
      return {
        ...newState,
        [label]: true,
      };
    });
  };

  const navLinks: MenuItem[] = [
    { label: "Home", href: "/" },
    { label: "Studio", href: "/studio" },
    {
      label: "Solutions",
      dropdownOptions: [
        {
          label: "All Solutions",
          href: "#",
          isParent: true,
        },
        {
          label: "Solar Solutions",
          href: "#",
        },
        {
          label: "Fire Safety Solutions",
          href: "#",
        },
      ],
    },
  ];

  return (
    <>
      <nav className="w-full h-auto bg-[#FFD7A8] flex justify-center sticky top-0 z-50 border-b-2 border-solid border-gray-800">
        <div className="flex h-16 w-full max-w-[1440px] justify-between items-center px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-[20px] sm:text-2xl font-semibold whitespace-nowrap text-gray-900 hover:text-gray-700 transition-colors"
            >
              SanityCMS Next.js
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg h-auto w-auto cursor-pointer"
            >
              <HiMenu size={20} />
              <span className="sr-only">Toggle navigation menu</span>
            </button>
          </div>
          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center gap-2 md:gap-4">
            {navLinks.map((item) => (
              <div key={item.label} className="relative group">
                {item.dropdownOptions ? (
                  <>
                    <button className="flex items-center gap-1 text-base font-semibold bg-gray-100 text-gray-700 border-2 border-gray-300 px-2 py-1 rounded-md hover:bg-gray-200 hover:text-gray-900 transition duration-300 h-auto">
                      {item.label}
                      <VscChevronDown className="ml-1" />
                    </button>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white shadow-lg rounded-lg w-[400px] z-50 border-2 border-gray-200 py-4 px-6 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                      <div className="grid grid-cols-1 gap-2">
                        {item.dropdownOptions.map((option, index) => {
                          const isParent = option.isParent || index === 0;
                          return (
                            <Link
                              key={option.label}
                              href={option.href}
                              className={`block rounded-lg hover:bg-gray-100 transition-colors relative overflow-hidden group/item ${
                                isParent
                                  ? "px-3 py-2 bg-gray-50 border border-gray-200"
                                  : "px-3 py-2 ml-4 pl-6"
                              }`}
                            >
                              {/* Left border indicator */}
                              <div
                                className={`absolute left-0 top-0 h-full w-1 bg-transparent group-hover/item:bg-gray-700 transition-colors ${
                                  isParent ? "bg-gray-300" : ""
                                }`}
                              ></div>
                              {/* Child indicator line */}
                              {!isParent && (
                                <div className="absolute left-4 top-1/2 w-3 h-px bg-gray-200"></div>
                              )}
                              <h3
                                className={`font-medium group-hover/item:text-gray-900 group-hover/item:underline transition-colors ${
                                  isParent
                                    ? "text-gray-900 font-semibold"
                                    : "text-gray-800"
                                }`}
                              >
                                {isParent && (
                                  <span className="inline-block mr-2 text-gray-900">
                                    📁
                                  </span>
                                )}
                                {option.label}
                              </h3>
                              {/* Optional description for parent */}
                              {isParent && (
                                <p className="text-xs text-gray-600 mt-1">
                                  View all solutions overview
                                </p>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="inline-flex items-center justify-center text-base font-semibold bg-gray-100 text-gray-700 border-2 border-gray-300 px-2 py-1 rounded-md hover:bg-gray-200 hover:text-gray-900 transition duration-300 h-auto"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Modal (Sheet replacement) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
              isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => {
              setIsModalOpen(false);
              setExpandedMenus({});
            }}
          ></div>
          {/* Modal Content */}
          <div
            className={`fixed top-0 left-0 right-0 bg-white border-b-2 border-gray-200 h-screen p-0 transform transition-transform duration-300 ease-in-out ${
              isModalOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-4 h-16 border-b-2 border-gray-200">
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  onClick={() => {
                    setIsModalOpen(false);
                    setExpandedMenus({});
                  }}
                  className="text-[18px] sm:text-xl font-semibold whitespace-nowrap text-gray-900 hover:text-gray-700 transition-colors"
                >
                  Amatcol Ltd
                </Link>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setExpandedMenus({});
                }}
                className="p-2 hover:bg-gray-100 rounded-lg h-auto w-auto cursor-pointer"
              >
                <HiX size={24} />
                <span className="sr-only">Close navigation menu</span>
              </button>
            </div>
            {/* Modal Body Content */}
            <div className="px-4 py-6 space-y-4 overflow-y-auto max-h-[calc(100vh-64px)]">
              {navLinks.map((item) => (
                <div key={item.label} className="w-full">
                  {item.dropdownOptions ? (
                    <>
                      <button
                        onClick={() => toggleMobileDropdown(item.label)}
                        className="flex items-center justify-between w-full text-base font-semibold bg-gray-100 text-gray-700 border-2 border-gray-300 px-2 py-2 rounded-md hover:bg-gray-200 hover:text-gray-900 transition duration-300 h-auto"
                      >
                        <span>{item.label}</span>
                        {expandedMenus[item.label] ? (
                          <VscChevronUp className="ml-2" />
                        ) : (
                          <VscChevronDown className="ml-2" />
                        )}
                      </button>
                      {expandedMenus[item.label] && (
                        <div className="mt-2 space-y-2">
                          {item.dropdownOptions.map((option, index) => {
                            const isParent = option.isParent || index === 0;
                            return (
                              <Link
                                key={option.label}
                                href={option.href}
                                onClick={() => setIsModalOpen(false)}
                                className="block rounded-lg bg-white hover:bg-gray-100 transition-colors group relative border border-gray-200 px-4 py-2 ml-8 pl-8"
                              >
                                {/* Left border indicator */}
                                <div
                                  className={`absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-700 transition-colors rounded-l-lg ${
                                    isParent ? "bg-gray-300" : ""
                                  }`}
                                ></div>
                                {/* Child indicator for mobile */}
                                {!isParent && (
                                  <div className="absolute left-6 top-1/2 w-4 h-px bg-gray-200"></div>
                                )}
                                <span
                                  className={`block font-medium group-hover:text-gray-900 group-hover:underline transition-colors ${
                                    isParent
                                      ? "text-gray-900 font-semibold"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {isParent && (
                                    <span className="inline-block mr-2 text-gray-900">
                                      📁
                                    </span>
                                  )}
                                  {option.label}
                                </span>
                                {/* Optional description for parent on mobile */}
                                {isParent && (
                                  <span className="block text-xs text-gray-600 mt-1">
                                    View all solutions overview
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href || "#"}
                      onClick={() => setIsModalOpen(false)}
                      className="block w-full text-left py-2 text-base font-semibold bg-gray-100 text-gray-700 border-2 border-gray-300 rounded-md hover:bg-gray-200 hover:text-gray-900 transition duration-300 h-auto"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
