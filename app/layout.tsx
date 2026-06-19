import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motkan — AI Systems for Real Estate",
  description: "AI systems that capture every lead, book more showings, and help your team close more deals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
