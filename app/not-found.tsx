import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5] px-4 text-[#1a1a1a]">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm text-[#4a4540]">
          <Link href="/" className="text-[#b54a32] underline">
            Return home
          </Link>
        </p>
      </body>
    </html>
  );
}
