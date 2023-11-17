import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/products";
import { useProductStore } from "@/store/products";

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: NextRequest) {
  // res.status(200).json()
  try {
    connectMongoDB();
    const data = await req.json();
    const res = await Product.create(data);
    return NextResponse.json(res);
  } catch (error: any) {
    NextResponse.json({ message: "failed" }, { status: 400 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const id = req.url.split("=")[1];
    // const product
    await connectMongoDB(); // Ensure connectMongoDB returns a Promise
    if (id) {
      const product = await Product.findOne({ _id: id });
      return NextResponse.json(product);
    } else {
      const products = await Product.find({}); // Fetch all products
      return NextResponse.json(products);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  // const {title, description, } = req.body
  const body = await req.json();
  const { title, price, description, _id } = body;
  try {
    const update = await Product.updateOne(
      { _id },
      { title, price, description, image: "pizza" }
    );
    return NextResponse.json(
      { message: "success", data: update, body },
      { status: 200 }
    );

    // const res = Product.find({})
  } catch (error) {
    return NextResponse.json(
      { message: "failed", status: "failed", body },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const _id = req.url.split("=")[1];
  try {
    const deletedProduct = await Product.deleteOne({
      _id,
    });
    return NextResponse.json(deletedProduct);
  } catch (error) {}
}
