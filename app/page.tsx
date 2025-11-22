import CreateForm from "@/components/CreateForm";
import LinkTable from "@/components/LinkTable";

export default async function DashboardPage() {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const res = await fetch(`${base}/api/links`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch links:", res.status);
    return (
      <main className="max-w-3xl mx-auto p-6 space-y-8">
        <h1 className="text-2xl font-bold">TinyLink Dashboard</h1>
        <p className="text-red-600">Failed to load links.</p>
        <CreateForm />
      </main>
    );
  }

  const links = await res.json();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">TinyLink Dashboard</h1>
      <CreateForm />
      <LinkTable links={links} />
    </main>
  );
}
