import { db } from "@/lib/db";

interface RouteProps {
  params: Promise<{ code: string }>;
}

// GET /api/links/:code
export async function GET(req: Request, context: RouteProps) {
  try {
    const { code } = await context.params; // await the promise

    const result = await db.query(
      `SELECT code, url, clicks, created_at, last_clicked
       FROM links
       WHERE code = $1
       LIMIT 1`,
      [code]
    );

    if (result.rowCount === 0) {
      return Response.json({ error: "Link not found" }, { status: 404 });
    }

    return Response.json(result.rows[0], { status: 200 });
  } catch (err) {
    console.error("GET /api/links/:code error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/links/:code
export async function DELETE(req: Request, context: RouteProps) {
  try {
    const { code } = await context.params; // await the promise

    const result = await db.query(
      `DELETE FROM links
       WHERE code = $1
       RETURNING *`,
      [code]
    );

    if (result.rowCount === 0) {
      return Response.json({ error: "Link not found" }, { status: 404 });
    }

    return Response.json({ deleted: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/links/:code error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
