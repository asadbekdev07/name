import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
