import DbConnect from "../../lib/db";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import { signJwtToken } from "../../lib/jwt";

export async function POST(req) {
  try {
    await DbConnect();

    const { name, email, password } = await req.json();
    if (!email || !password) {
      throw new Error("All field must be filled!");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      throw new Error("User already exists!");
    }

    const passHash = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: passHash });

    const token = signJwtToken({ id: user._id });

    return new Response(JSON.stringify(token), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
