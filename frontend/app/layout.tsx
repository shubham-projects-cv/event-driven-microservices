import "@/app/globals.css";
import Providers from "@/app/providers";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
