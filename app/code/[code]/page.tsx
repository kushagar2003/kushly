interface PageProps {
  params: { code: string };
}

export default async function StatsPage({ params }: PageProps) {
  const { code } = params;

  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const res = await fetch(`${base}/api/links/${code}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return (
      <main className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Not Found</h1>
        <p>The link with code <strong>{code}</strong> does not exist.</p>
      </main>
    );
  }

  const data = await res.json();

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Stats for: {data.code}</h1>

      <div className="p-4 border rounded space-y-2">
        <div>
          <strong>Original URL:</strong>
          <div>
            <a href={data.url} className="text-blue-600 underline" target="_blank">
              {data.url}
            </a>
          </div>
        </div>

        <p>
          <strong>Total Clicks:</strong> {data.clicks}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {new Date(data.created_at).toLocaleString()}
        </p>

        <p>
          <strong>Last Clicked:</strong>{" "}
          {data.last_clicked ? new Date(data.last_clicked).toLocaleString() : "—"}
        </p>
      </div>

      <a href="/" className="text-blue-600 underline">
        ← Back to Dashboard
      </a>
    </main>
  );
}
