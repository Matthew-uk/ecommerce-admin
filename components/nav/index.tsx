"use client";
import "./index.css";
import { BiCart, BiHomeAlt, BiLogOut, BiStore } from "react-icons/bi";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface NavProps {
  show: boolean;
}

const Nav: React.FC<NavProps> = ({ show }) => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = async () => {
    router.push("/");
    await signOut();
  };

  return (
    <aside
      className={`text-gray-500 bg-gray-300 font-bold p-4 pr-0 fixed ${
        show ? "left-0" : "-left-full"
      } w-full h-full md:static md:w-auto transition-all`}
    >
      <a className=" text-black text-lg font-bold flex justify-center w-max items-center mb-5 mr-2">
        <BiStore />
        <span className="mt-2">EcommerceAdmin</span>
      </a>
      <nav className="flex gap-5 mb-4 flex-col">
        <Link
          href={"/"}
          className={`menu-items ${pathname === "/" && "active"}`}
        >
          <BiHomeAlt />
          <p className="mt-2">Dashboard</p>
        </Link>
        <Link
          href={"/products"}
          className={`menu-items flex items-center ${
            pathname.includes("/products") && "active"
          }`}
        >
          <BiCart />
          <p className="mt-2">Products</p>
        </Link>
        <Link
          href={"/orders"}
          className={`menu-items ${pathname === "/orders" && "active"}`}
        >
          <HiOutlineQueueList />
          <p className="mt-2">Orders</p>
        </Link>
        <Link
          href={"/settings"}
          className={`menu-items ${pathname === "/settings" && "active"}`}
        >
          <IoSettingsOutline />
          <p className="mt-2">Settings</p>
        </Link>
        <div onClick={logout} className="menu-item flex cursor-pointer">
          <BiLogOut />
          <p className="ml-2">Logout</p>
        </div>
      </nav>
    </aside>
  );
};

export default Nav;
