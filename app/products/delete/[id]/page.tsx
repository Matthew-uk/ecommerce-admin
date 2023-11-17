"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Layout from "@/components/layout";

interface Product {
  _id: string;
  title: string;
  // Add other properties as needed
}

interface PageProps {
  params: { id: string };
}

const ProductPage: FC<PageProps> = ({ params }) => {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product>(
          `/api/products?id=${params.id}`
        );
        setCurrentProduct(response.data);
      } catch (error) {
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [params.id]);

  const handleDeleteProduct = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/products?id=${params.id}`);
      router.push("/products");
    } catch (error) {
      setError("Error deleting product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {currentProduct && (
        <>
          <h1 className="mb-5">
            Do you want to delete{" "}
            <span className="font-extrabold ml-2">
              "{currentProduct.title}"?
            </span>
          </h1>
          <button
            className="btn btn-red disabled:opacity-25"
            disabled={loading}
            onClick={handleDeleteProduct}
          >
            YES
          </button>
          <Link href="/products">
            <span className="btn btn-basic">NO</span>
          </Link>
        </>
      )}
    </Layout>
  );
};

export default ProductPage;
