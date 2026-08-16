import AdminNav from "./components/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050507]">
      <AdminNav />

      <div className="lg:pl-64">
        {children}
      </div>
    </div>
  );
}