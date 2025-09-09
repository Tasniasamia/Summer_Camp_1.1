"use client";
import { useEffect, useState } from "react";
import { Drawer, message, Space } from "antd";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBorderNone } from "react-icons/fa6";
import UserDashboardSkeleton from "@/components/(site)/common/skeleton/userDashboardSkeleton";
import Banner from "@/components/(site)/common/banner";
import { useAuth } from "@/helpers/context/authContext";
import toast from "react-hot-toast";
import { useFetch } from "@/helpers/utils/hooks";

const UserDashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const pathname = usePathname();
  const [pathName, setPathName] = useState("");
  const { data, isLoading, error } = useFetch("profile", "/user");
  const {user,setUser, currentUser, signout }=useAuth();
  console.log("fetch data",data?.data);
  useEffect(() => {
    if (!data?.data) {
      const token=localStorage.getItem('token');
      if(token){
        return;
      }
      else{
        window.location.href="/";
      }
    }; // ডাটা না এলে কিছু করব না  
    if (data?.data?.role !== "instructor") {
      toast.error("Please login as a instructor");
      window.location.href = "/";
    } else {
      setUser(data?.data);
    }
  }, [data]);
  const menuItems = [
    { id: 1, name: "Dashboard", href: "/user", icon: <MdOutlineDashboard /> },
    {
      id: 2,
      name: "Enrolled Courses",
      href: "/trainer/classes",
      icon: <FaBorderNone />,
    },
    {
      id: 5,
      name: "Settings",
      href: "/trainer/setting",
      icon: <IoSettingsOutline />,
    },
  ];
  useEffect(() => {
    const currentItem = menuItems.find((item) => item.href === pathname);
    if (currentItem) {
      setPathName(
        currentItem.name === "Dashboard" ? "User Dashboard" : currentItem.name
      );
    }
  }, [pathname]);
  const instructor = true;
  return (
    <>
      {!instructor ? (
        <UserDashboardSkeleton />
      ) : (
        <section className="">
          <Banner title={pathName || "Instructor Dashboard"} />
          <div className="my-[60px] lg:my-[120px]">
          <div className="custom-container  h-fit bg-white ">
            <div className="flex h-fit w-full flex-col gap-6 lg:flex-row">
              <div className="block lg:hidden">
                <Space>
                  <IoMdMenu
                    className="cursor-pointer text-[40px]"
                    onClick={showDrawer}
                  />
                </Space>
                <Drawer
                  placement="left"
                  closable={false}
                  onClose={onClose}
                  open={open}
                >
                  <SidebarContent menuItems={menuItems} />
                </Drawer>
              </div>

              <div className="hidden h-fit w-full overflow-hidden rounded-[20px] border border-gray-200 bg-white pb-[113px] shadow-md lg:block lg:w-1/4">
                <SidebarContent
                  menuItems={menuItems}
                  setPathName={setPathName}
                />
              </div>

              {isSidebarOpen && (
                <div
                  className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
                  onClick={toggleSidebar}
                ></div>
              )}

              <div className="h-fit w-full overflow-hidden rounded-[20px] border border-gray-200 p-2 shadow-md sm:p-6 lg:w-3/4">
                {children}
              </div>
            </div>
          </div>
          </div>
        </section>
      )}
    </>
  );
};

const SidebarContent = ({ menuItems, setPathName }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="h-fit">
      <div className="h-fit bg-[#EDEDED] font-roboto">
        <div className="flex items-center justify-start gap-[10px] py-[34px] ps-4">
          <div className="rounded-full border border-gray-200 p-[3px]">
            <Image
              width={48}
              height={48}
              className="h-[48px] w-[48px] rounded-full object-cover"
              src={"/default.jpg"}
              alt="profile"
            />
          </div>
          <div>
            <h3 className="mb-[2px] font-medium">Student</h3>
            <p className="text-sm text-gray-500">student@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-[242px] px-4 pt-[40px]">
        <nav className="w-fit space-y-[27px]">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`group flex !w-fit items-center gap-[15px] ${
                pathname == item?.href ? "text-orange-500 bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500" : "!text-textMain"
              }`}
            >
              <span className="text-[24px] group-hover:text-orange-500">
                {item?.icon}
              </span>
              <span className="sidebar-title capitalize group-hover:text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                {item?.name}
              </span>
            </Link>
          ))}

          <div className="space-y-[27px] pt-[50px]">
            <a
              className="group flex cursor-pointer items-center gap-[15px]"
              onClick={() => {
                signout();
                window.location.href = '/';
                toast.success("Logout Successfully");
              }}
            >
              <HiOutlineLogout className="h-6 w-6 text-textMain group-hover:text-oranage-500" />
              <span className="sidebar-title text-textMain group-hover:text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                Logout
              </span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
