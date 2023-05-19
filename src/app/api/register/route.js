import DbConnect from "@/app/lib/db";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";

export async function POST(req) {
  try {
    await DbConnect();

    const { username, email, password } = await req.json();

    const isExisting = await User.findOne({ email });
    if (isExisting) {
      throw new Error("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return new Response(JSON.stringify({ msg: "User registration success!" }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
