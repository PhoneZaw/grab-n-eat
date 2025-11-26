import Footer from "@/components/footer";
import CustomerNav from "@/components/customerNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFEFEF] to-white">
      <CustomerNav authHeader={true} />

      {children}
    </div>
  );
}
