"use client";

export default function LinkTable({ links }: { links: any[] }) {
  async function deleteLink(code: string) {
    await fetch(`/api/links/${code}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-4">All Links</h2>

      {links.length === 0 && <p>No links created yet.</p>}

      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th className="p-2">Code</th>
            <th className="p-2">URL</th>
            <th className="p-2">Clicks</th>
            <th className="p-2">Last Clicked</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((l) => (
            <tr key={l.code} className="border-t">
              <td className="p-2 font-mono">{l.code}</td>

              <td className="p-2 max-w-xs truncate">
                <a
                  href={l.url}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  {l.url}
                </a>
              </td>

              <td className="p-2">{l.clicks}</td>

              <td className="p-2">
                {l.last_clicked
                  ? new Date(l.last_clicked).toLocaleString()
                  : "—"}
              </td>

              <td className="p-2 space-x-2">
                <a
                  href={`/code/${l.code}`}
                  className="text-indigo-600 underline"
                >
                  Stats
                </a>

                <button
                  onClick={() => deleteLink(l.code)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
