import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report-Talent Heaven",
  description: "Where skills meet opportunity",
};

export default function ReportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
