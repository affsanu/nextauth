import DbConnect from "@/app/lib/db";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import { signJwtToken } from "@/app/lib/jwt";

export async function POST(req) {
  try {
    await DbConnect();

    const { email, password } = await req.json();
    if (!email || !password) {
      throw new Error("All field must be filled!");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Credential!");
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      throw new Error("Invalid Credential!");
    }

    const token = signJwtToken({id: user._id});

    return new Response(JSON.stringify(token), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
