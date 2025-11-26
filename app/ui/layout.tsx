import Footer from "@/components/footer";
import CustomerNav from "@/components/customerNav";
import { getFooterData } from "@/services/footer/getFooter";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFEFEF] to-white">
      <CustomerNav />
      {children}
      <Footer />
    </div>
  );
}
