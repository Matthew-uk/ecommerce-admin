"use client";
import Layout from "@/components/layout";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import Link from "react"
import axios from "axios";
interface pageProps {
  params: { id: string };
}

const page: FC<pageProps> = ({ params }) => {
  const [currentProduct, setCurrentProduct] = useState({});
  const [title, settitle] = useState("");
  const [_id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getProduct = async () => {
      const product = await axios.get(`/api/products?id=${params.id}`);
      setCurrentProduct(product.data);
      console.log(product.data);
    };
    getProduct();
  }, []);

  useEffect(() => {
    settitle(currentProduct.title);
    setId(currentProduct._id);
  }, [currentProduct]);

  const handleDeleteProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/products?id=${params.id}`);
      console.log(res);
      router.push("/products");
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <h1 className="mb-5">
        Do you want to delete{" "}
        <span className="font-extrabold ml-2">"{title}"?</span>
      </h1>
      <button
        className="btn btn-red disabled:opacity-25"
        disabled={loading}
        onClick={handleDeleteProduct}
      >
        YES
      </button>
      <Link href={"/products"}>
        <span className="btn btn-basic">NO</span>
      </Link>
    </Layout>
  );
};

export default page;
