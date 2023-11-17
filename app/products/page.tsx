"use client";
import Layout from "@/components/layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useProductStore } from "@/store/products";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

const Products = () => {
  const { products, setProducts } = useProductStore();
  const [state, setState] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await axios.get("/api/products");
        console.log(products.data);
        setProducts(products.data.data);
        setState(products.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  return (
    <Layout>
      <Link
        className="bg-blue-900 text-white p-2 rounded-md"
        href={"/products/new"}
      >
        Add new products
      </Link>
      <table className="basic">
        {/* Table Head */}
        <thead>
          <tr>
            <td>Product name</td>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {state.map((product: any) => (
            <tr>
              <td>{product.title}</td>
              <td>
                <Link
                  className="flex text-center justify-between"
                  href={`/products/edit/${product._id}`}
                >
                  <FaEdit />
                  <p className="mt-1">Edit</p>
                </Link>
                <Link
                  className="flex text-center justify-between"
                  href={`/products/delete/${product._id}`}
                >
                  <AiOutlineDelete />
                  <p className="mt-1">Delete</p>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
