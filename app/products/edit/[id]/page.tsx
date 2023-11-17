"use client";
import Layout from "@/components/layout";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BsUpload } from "react-icons/bs";
interface pageProps {
  params: { id: string };
}

const page: FC<pageProps> = ({ params }) => {
  const [currentProduct, setCurrentProduct] = useState({});
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState<number>(0); // Assuming price is a number
  const [_id, setId] = useState("");
  const [image, setImage] = useState<File>();
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
    setdescription(currentProduct.description);
    setprice(currentProduct.price);
    settitle(currentProduct.title);
    setId(currentProduct._id);
    setImage(currentProduct.image);
  }, [currentProduct]);

  const handleUpload = async (e: any) => {
    e.preventDefault();
    console.log(image);
    if (!image) return console.log("Insert File");
    const formData = new FormData();
    formData.append("file", image); // Append the file to FormData
    try {
      console.log(formData);
      const res = await axios.put(
        `/api/upload?=${currentProduct._id}`,
        formData
      );
      console.log(res.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleEditProduct = async (e: any) => {
    e.preventDefault();
    const data = { title, price, description, _id };
    console.log({ data });
    try {
      setLoading(true);
      const res = await axios.put("/api/products", data);
      console.log(res);
      router.push("/products");
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <h1>{title}</h1>
      <form onSubmit={handleEditProduct}>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Add New Products"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <label>Description</label>
        <label>Photos</label>
        <div className="mb-2">
          <label className="w-24 cursor-pointer h-24 flex flex-col gap-1 rounded-lg bg-gray-400 text-gray-200 justify-center items-center">
            <BsUpload />
            Upload
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0])}
              className="hidden"
            />
          </label>
          <p className="">
            {image ? image?.name : "No Images for this product"}
          </p>
          <br />
          <button
            className="p-2 bg-blue-900 m-0 text-white text-center rounded-md disabled:opacity-50"
            type="button"
            onClick={handleUpload}
            disabled={!image}
          >
            Submit
          </button>
        </div>
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        ></textarea>
        <label>Price (in NGN)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setprice(Number(e.target.value))}
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

export default page;
