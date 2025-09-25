import Nav from "@/components/home/nav";
import SectionWrapper from "@/components/wrapper/section-wrapper";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-auto relative">
      <Nav />
      <div className="pt-[50px]">
        <SectionWrapper>{children}</SectionWrapper>
      </div>
    </main>
  );
}
