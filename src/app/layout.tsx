import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Prometheus Resume Optimizer",
  description: "AI-powered resume enhancement tailored to job descriptions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white font-sans">
        <header className="p-4 shadow-md bg-gradient-to-r from-orange-600 to-red-700">
          <nav className="flex justify-between items-center max-w-6xl mx-auto">
            <h1 className="text-xl font-bold">Prometheus</h1>
            <div className="space-x-6">
              <Link href="/">Home</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/testimonials">Testimonials</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto p-4">{children}</main>
        <footer className="text-center text-sm text-gray-400 p-4">
          &copy; {new Date().getFullYear()} Prometheus Resume Optimizer
        </footer>
      </body>
    </html>
  );
}
