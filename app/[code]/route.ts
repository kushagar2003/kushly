import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { code: string } | Promise<{ code: string }> }
) {
  // resolve params safely
  const { code } = await Promise.resolve(context.params);

  try {
    const result = await db.query(
      `SELECT url, clicks FROM links WHERE code = $1 LIMIT 1`,
      [code]
    );

    if (result.rowCount === 0) {
      return Response.json({ error: "Link not found" }, { status: 404 });
    }

    const link = result.rows[0];

    await db.query(
      `UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code = $1`,
      [code]
    );

    return Response.redirect(link.url, 302);
  } catch (err) {
    console.error("Redirect error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
