import { NextRequest, NextResponse } from "next/server";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { analytics } from "@/firebaseConfig";
import { join } from "path";
import { writeFile } from "fs/promises";
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/products";

export async function PUT(req: NextRequest, res: NextResponse) {
  connectMongoDB();
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    } else {
      // uploadBytes(storageRef, file).then((snapshot) => {
      //   console.log("Uploaded a blob or file!");
      // });
      const path = join(process.cwd(), "temp", file.name);
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(path, buffer);
      const id = req.url.split("=")[1];
      const product = await Product.updateOne({ _id: id }, { image: path });
      console.log("id");

      return NextResponse.json(
        {
          message: "File uploaded successfully",
          file: file.name,
          buffer,
          path,
          id: id,
          product,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error during file upload:", error);
    return NextResponse.json(
      { message: "Error during file upload:", error },
      { status: 400 }
    );
  }
}
