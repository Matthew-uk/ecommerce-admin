"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "@/components/layout";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div>
        <h1>Hello {session?.user?.name}</h1>
        {/* <Image src={session?.user?.image} alt="Image"></Image> */}
      </div>
    </Layout>
  );
}
