"use client";
import { useState } from "react";
import Nav from "../nav";
import "./index.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { BiMenu, BiStore, BiX } from "react-icons/bi";

const Layout = ({ children }: any) => {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);
  if (!session) {
    return (
      <div className="bg-gray-300 flex w-screen h-screen items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="p-2 bg-white rounded-lg px-4"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-300 w-screen min-h-screen">
      <div className="flex items-center md:block lg:hidden m-0">
        <button
          className="md:block lg:hidden m-0"
          onClick={() => setShowNav(!showNav)}
        >
          {showNav ? (
            <BiX
              style={{
                color: "#000",
                width: "2em",
                height: "2em",
              }}
            />
          ) : (
            <BiMenu
              style={{
                color: "#000",
                width: "2em",
                height: "2em",
              }}
            />
          )}
        </button>
        <a className="text-black text-lg font-bold mt-4 flex w-full justify-center items-center mb-5 mr-2">
          <BiStore />
          <span className="mt-1">EcommerceAdmin</span>
        </a>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="bg-white min-h-screen flex-grow mr-1 mt-1 rounded-lg p-4 w-full">
          <h2>{children}</h2>
        </div>
      </div>
    </div>
  );
};

export default Layout;
