"use client";
import { useAuth } from "@/helpers/context/authContext";
import { useFetch } from "@/helpers/utils/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaGlobe, FaWallet } from "react-icons/fa";
import {
  FiHome,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiMessageSquare,
  FiSearch,
  FiBell,
  FiUser,
  FiMenu,
  FiChevronDown,
  FiChevronRight,
  FiLogOut,
  FiHelpCircle,
  FiPackage,
} from "react-icons/fi";

const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  navMain: [
    {
      title: "Overview",
      url: "/admin",
      icon: FiHome,
      isActive: true,
    },
    {
      title: "Classes",
      url: "/admin/class",
      icon: FiBarChart2,
      items: [
        { title: "Classes", url: "/admin/class", isActive: true },
        { title: "Create Class", url: "/admin/class/add" },
        { title: "Enrolled Class", url: "/admin/class/enrolled" },
      ],
    },
    {
      title: "User",
      url: "/admin/user",
      icon: FiUsers,
    },
    {
      title: "Wallet",
      url: "/admin/wallet",
      icon: FaWallet,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: FiSettings,
    },
    {
      title: "Help & Support",
      url: "/admin/help",
      icon: FiHelpCircle,
    },
  ],
};

function Avatar({ src, name }) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return src ? (
    <img
      src={src}
      alt={name}
      className="h-10 w-10 rounded-lg object-cover border-2 border-yellow-400"
    />
  ) : (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 text-white font-semibold border-2 border-yellow-400">
      {initials}
    </div>
  );
}

function SidebarMenuItem({
  item,
  isSubItem,
  isActive,
  expanded,
  toggleExpanded,
}) {
  const Icon = item.icon;
  return (
    <li>
      {item.items ? (
        <>
          <button
            type="button"
            onClick={toggleExpanded}
            className={`flex items-center w-full gap-2 rounded-md px-3 py-2 text-sm font-medium transition
              ${
                isActive
                  ? "bg-yellow-100 text-yellow-700 font-semibold"
                  : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
              }
              ${isSubItem ? "pl-8" : ""}
            `}
          >
            {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
            <span className="flex-1 text-left">{item.title}</span>
            {item.badge && (
              <span className="ml-auto rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-medium text-yellow-800 select-none">
                {item.badge}
              </span>
            )}
            <FiChevronRight
              className={`h-4 w-4 ml-2 transition-transform ${
                expanded ? "rotate-90" : ""
              }`}
            />
          </button>
          {expanded && (
            <ul className="mt-1 space-y-1">
              {item.items.map((subItem) => (
                <SidebarMenuItem
                  key={subItem.title}
                  item={subItem}
                  isSubItem={true}
                  isActive={subItem.isActive}
                />
              ))}
            </ul>
          )}
        </>
      ) : (
        <a
          href={item.url}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition
            ${
              isActive
                ? "bg-yellow-100 text-yellow-700 font-semibold"
                : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
            }
            ${isSubItem ? "pl-8" : ""}
          `}
        >
          {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
          <span className="flex-1">{item.title}</span>
          {item.badge && (
            <span className="ml-auto rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-medium text-yellow-800 select-none">
              {item.badge}
            </span>
          )}
        </a>
      )}
    </li>
  );
}

function AppSidebar({ collapsed, setCollapsed }) {
  const [expandedItems, setExpandedItems] = useState({});

  function toggleExpand(title) {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }

  return (
    <aside
      className={`flex flex-col bg-white border-r border-gray-200 h-screen transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle Sidebar"
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-600 text-white"
        >
          <FiMenu className="h-5 w-5" />
        </button>
        {!collapsed && (
          <div className="flex flex-col leading-tight text-sm truncate">
            <span className="font-semibold truncate">Summer Camp</span>
            <span className="text-xs text-gray-500 truncate">Enterprise</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        <div>
          <p
            className={`mb-2 text-xs font-semibold text-gray-500 uppercase select-none ${
              collapsed ? "hidden" : ""
            }`}
          >
            Main Navigation
          </p>
          <ul className="flex flex-col gap-1">
            {data.navMain.map((item) => (
              <SidebarMenuItem
                key={item.title}
                item={item}
                isActive={item.isActive}
                expanded={expandedItems[item.title] || false}
                toggleExpanded={() => toggleExpand(item.title)}
              />
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <p
            className={`mb-2 text-xs font-semibold text-gray-500 uppercase select-none ${
              collapsed ? "hidden" : ""
            }`}
          >
            Settings
          </p>
          <ul className="flex flex-col gap-1">
            {data.navSecondary.map((item) => (
              <SidebarMenuItem
                key={item.title}
                item={item}
                expanded={expandedItems[item.title] || false}
                toggleExpanded={() => toggleExpand(item.title)}
              />
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer - User */}
      <div className="border-t border-gray-200 p-4">
        <UserDropdown collapsed={collapsed} />
      </div>
    </aside>
  );
}

function UserDropdown({ collapsed }) {
  const [open, setOpen] = useState(false);
  const {  signout } = useAuth();

  return (
    <div className="relative">
      {/* <button
        onClick={() => setOpen(!open)}
        className="flex items-center w-full gap-3 rounded-md p-2 hover:bg-yellow-50 transition"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Avatar src={data.user.avatar} name={data.user.name} />
        {!collapsed && (
          <div className="flex flex-col text-left overflow-hidden truncate">
            <span className="font-semibold truncate">{data.user.name}</span>
            <span className="text-xs text-gray-500 truncate">
              {data.user.email}
            </span>
          </div>
        )}
        {!collapsed && <FiChevronDown className="ml-auto h-4 w-4" />}
      </button> */}

      {open && (
        <div className="absolute bottom-full mb-2 left-0 w-full rounded-md border border-gray-200 bg-white shadow-lg text-sm z-20">
          <ul className="flex flex-col divide-y divide-gray-100">
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-50 transition"
              >
                <FiUser className="h-4 w-4" />
                Account
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-50 transition"
              >
                <FiSettings className="h-4 w-4" />
                Settings
              </a>
            </li>
            <li>
              <button
                className="flex items-center !cursor-pointer gap-2 px-4 py-2 hover:bg-yellow-50 transition"
                onClick={() => {
                  console.log("will logout");
                  signout();
                  window.location.href = "/";
                  toast.success("Logout Successfully");
                }}
              >
                <FiLogOut className="h-4 w-4" />
                Log out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default function DashboardLayout({ children }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // const { data, isLoading, error } = useFetch("profile", "/user");
  // const { user, setUser, currentUser } = useAuth();

  // useEffect(() => {
  //   if (!data?.data) {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       return;
  //     } else {
  //       window.location.href = "/";
  //     }
  //   }

  //   if (data?.data?.role !== "admin") {
  //     toast.error("Please login as a admin");
  //     window.location.href = "/";
  //   } else {
  //     setUser(data?.data);
  //   }
  // }, [data]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <AppSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4">
          <button
            aria-label="Toggle Sidebar"
            className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100 transition md:hidden"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <FiMenu className="h-5 w-5" />
          </button>

          {/* Breadcrumb */}
          <nav className="hidden md:flex items-center gap-2 text-sm text-gray-600 select-none">
            <a href="#" className="hover:text-yellow-600 transition">
              Dashboard
            </a>
            <span>/</span>
            <span className="font-semibold text-gray-900">Overview</span>
          </nav>

          {/* Search */}
          <div className="relative ml-auto hidden md:block">
            <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-72 rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
          </div>

          {/* Notification Bell */}
          <button
            className="relative ml-4 rounded-md p-2 hover:bg-gray-100 transition"
            aria-label="Notifications"
          >
            <FiBell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                {notifications}
              </span>
            )}
          </button>

          {/* User Profile Menu */}
          <Link
            className="relative ml-4 rounded-md p-2 hover:bg-gray-100 transition"
            href="/"
          >
            <FaGlobe className="h-5 w-5" />
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
