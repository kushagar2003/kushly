import CreateForm from "@/components/CreateForm";
import LinkTable from "@/components/LinkTable";

export default async function DashboardPage() {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.BASE_URL;

  const res = await fetch(`${base}/api/links`, {
    cache: "no-store",
  });

  const links = await res.json();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">TinyLink Dashboard</h1>
      <CreateForm />
      <LinkTable links={links} />
    </main>
  );
}
