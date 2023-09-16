import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

connect();
export async function POST(request: NextRequest) {
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync("123456", salt);
  await User.create({
    email: "admin@gmail.com",
    password: password,
    name: "Admin",
    role: "Admin",
  });

  return NextResponse.json({
    status: 200,
    message: "Admin created successfully",
  });
}
