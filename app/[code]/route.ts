import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  try {
    const result = await db.query(
      `SELECT url FROM links WHERE code = $1 LIMIT 1`,
      [code]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: "Link not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = result.rows[0].url;

    await db.query(
      `UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code = $1`,
      [code]
    );

    return Response.redirect(url, 302);
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
