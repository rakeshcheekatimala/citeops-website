import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PlaygroundClient } from "@/components/playground/PlaygroundClient";

export default function PlaygroundPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-wash via-paper to-paper-muted">
        <PlaygroundClient />
      </main>
      <SiteFooter />
    </>
  );
}
