import DbConnect from "@/app/lib/db";
import { verifyJwtToken } from "@/app/lib/jwt";
import Comment from "@/app/models/Comment";

export async function GET(req, ctx) {
  await DbConnect();

  const id = ctx.params.id;
  try {
    const comment = await Comment.find({ blogId: id }).populate("authorId");
    return new Response(JSON.stringify(comment), { status: 200 });
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
    const comment = await Comment.findById(id).populate("authorId");
    if (comment.authorId._id.toString() !== decodeToken._id.toString()) {
      return new Response(
        JSON.stringify({ msg: "Only author can delete his blog" }),
        { status: 401 }
      );
    }

    await Comment.findByIdAndDelete(id);
    return new Response(JSON.stringify({ msg: "Delete Success" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
