import DbConnect from "@/app/lib/db";
import { verifyJwtToken } from "@/app/lib/jwt";
import Comment from "@/app/models/Comment";

export async function POST(req, ctx) {
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
    let newComment = await Comment.create(body);
    newComment = await newComment.populate("authorId");
    return new Response(JSON.stringify(newComment), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
