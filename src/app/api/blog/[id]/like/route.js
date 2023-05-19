import DbConnect from "@/app/lib/db";
import { verifyJwtToken } from "@/app/lib/jwt";
import Blog from "@/app/models/Blog";

export async function PUT(req, ctx) {
  await DbConnect();

  const id = ctx.params.id;
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
    const blog = await Blog.findById(id)

    if (blog.likes.includes(decodeToken._id)) {
       blog.likes = blog.likes.filter((id) => id.toString !== decodeToken._id.toString()) 
    } else {
        blog.likes.push(decodeToken._id)
    }

    return new Response(JSON.stringify({msg: "Interacted Success!"}), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
