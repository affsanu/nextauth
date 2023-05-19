import DbConnect from "@/app/lib/db";
import { verifyJwtToken } from "@/app/lib/jwt";
import Blog from "@/app/models/Blog";
import User from "@/app/models/User";

export async function GET(req, { params: ctx }) {
  await DbConnect();
  const id = ctx.params.id;
  try {
    const blog = await Blog.findById(id)
      .populate("authorId")
      .select("-password");

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
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
    const body = await req.json();
    const blog = await Blog.findById(id).populate("authorId");

    if (blog?.authorId?._id.toString() !== decodeToken._id.toString()) {
      return new Response(
        JSON.stringify({ msg: "Only author can update his blog!" }),
        { status: 403 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );

    return new Response(JSON.stringify(updatedBlog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function DELETE(req, ctx) {
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
    const blog = await Blog.findById(id).populate("authorId");

    if (blog?.authorId?._id.toString() !== decodeToken._id.toString()) {
      return new Response(
        JSON.stringify({ msg: "Only author can delete his blog!" }),
        { status: 403 }
      );
    }

    await Blog.findByIdAndDelete(id);

    return new Response(JSON.stringify({ msg: "Delete Success!" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
