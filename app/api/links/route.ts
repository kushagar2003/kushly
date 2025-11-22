import { db } from "@/lib/db";
import { generateCode } from "@/lib/codes";
import { isValidURL, isValidCustomCode } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const { url, code } = await req.json();

    if (!url || !isValidURL(url)) {
      return Response.json({ error: "Invalid URL" }, { status: 400 });
    }

    let finalCode = code;

    if (code) {
      if (!isValidCustomCode(code)) {
        return Response.json(
          { error: "Invalid code format. Use A-Za-z0-9, 6–8 chars." },
          { status: 400 }
        );
      }
    } else {
      finalCode = generateCode(6);
    }

    const exists = await db.query(
      `SELECT code FROM links WHERE code = $1 LIMIT 1`,
      [finalCode]
    );

    if (exists && exists.rowCount > 0) {
      return Response.json({ error: "Code already exists" }, { status: 409 });
    }


    await db.query(
      `INSERT INTO links (code, url) VALUES ($1, $2)`,
      [finalCode, url]
    );

    return Response.json({ code: finalCode, url }, { status: 201 });
  } catch (err) {
    console.error("POST /api/links error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// -------- GET /api/links --------
export async function GET() {
  try {
    const result = await db.query(
      `SELECT code, url, clicks, created_at, last_clicked FROM links ORDER BY created_at DESC`
    );

    return Response.json(result.rows, { status: 200 });
  } catch (err) {
    console.error("GET /api/links error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
