import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  // Await the params promise
  const { code } = await params;

  try {
    // Find link
    const result = await db.query(
      `SELECT url, clicks FROM links WHERE code = $1 LIMIT 1`,
      [code]
    );

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ error: "Link not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const link = result.rows[0];

    // Increment clicks and last_clicked
    await db.query(
      `UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code = $1`,
      [code]
    );

    // Redirect
    return Response.redirect(link.url, 302);
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
