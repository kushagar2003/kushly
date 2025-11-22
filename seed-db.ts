import { db } from "./lib/db";

async function seed() {
  try {
    const result = await db.query(
      `INSERT INTO links (code, url, clicks, created_at) 
       VALUES ($1, $2, 0, NOW())
       RETURNING *`,
      ["TEST123", "https://google.com"]
    );

    console.log("Seeded link:", result.rows[0]);
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    db.end();
  }
}

seed();
