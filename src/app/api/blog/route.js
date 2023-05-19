import DbConnect from "@/app/lib/db";
import { verifyJwtToken } from "@/app/lib/jwt";
import Blog from "@/app/models/Blog";

export async function GET(req) {
  await DbConnect();

  try {
    const blogs = await Blog.find({}).limit(16).populate("authorId");

    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function POST(req) {
  await DbConnect();

  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];
  const decodeToken = verifyJwtToken(token);

  if (!accessToken || !decodeToken) {
    return new Response(
      JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const newBlog = await Blog.create(body);
    return new Response(JSON.stringify(newBlog), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
