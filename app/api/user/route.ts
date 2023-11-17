import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { email, name } = await request.json();
  await connectMongoDB();
  const userExists = await User.findOne({ email });
  if (!userExists) {
    await User.create({ name, email });
    return NextResponse.json(
      {
        status: "success",
        message: "User Created Successfully",
      },
      { status: 201 }
    );
  } else {
    return NextResponse.json(
      {
        status: "error",
        message: "User already exists",
      },
      { status: 400 }
    );
  }
};
