import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { RoleCards } from "@/components/landing/RoleCards";
import { LeaderboardPreview } from "@/components/landing/LeaderboardPreview";
import { AttendancePreview } from "@/components/landing/AttendancePreview";
import { Features } from "@/components/landing/Features";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <section id="roles">
        <RoleCards />
      </section>
      <section id="leaderboard">
        <LeaderboardPreview />
      </section>
      <AttendancePreview />
      <section id="features">
        <Features />
      </section>
      <CTA />
      <Footer />
    </main>
  );
}
