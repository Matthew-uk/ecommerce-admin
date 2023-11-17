"use client";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import React from "react";

const Products = () => {
  const { data: session } = useSession();
  return <Layout>This is Settings Page</Layout>;
};

export default Products;
