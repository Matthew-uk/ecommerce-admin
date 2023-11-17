"use client";
import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const New = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [goToProduct, setGoToProducts] = useState(false);
  const router = useRouter();

  const handleCreateProduct = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = { title, description, price };
      await axios.post("/api/products", data);
      setGoToProducts(true);
    } catch (error: any) {
      setErr(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (goToProduct) {
    router.push("/products");
  }

  return (
    <Layout>
      <h1>New Products</h1>
      <form onSubmit={handleCreateProduct}>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Add New Products"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Photos</label>
        <div>Insert Images Here!!!</div>
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price (in NGN)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button
          disabled={loading}
          type="submit"
          className="btn-primary disabled:opacity-50"
        >
          {loading ? "Loading..." : "Save"}
        </button>
      </form>
    </Layout>
  );
};

export default New;
