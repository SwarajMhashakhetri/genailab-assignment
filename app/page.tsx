import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { PhotoToStory } from "@/components/landing/photo-to-story";
import { BookMarquee } from "@/components/landing/book-marquee";
import { Bento } from "@/components/landing/bento";
import { InsideGallery } from "@/components/landing/inside-gallery";
import { StoryShowcase } from "@/components/landing/story-showcase";
import { SocialProof } from "@/components/landing/social-proof";
import { CtaSection } from "@/components/landing/cta-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { ScrollProgress } from "@/components/fx/scroll-progress";
import { CursorGlow } from "@/components/fx/cursor-glow";

export default function Home() {
  return (
    <div className="grain relative">
      <ScrollProgress />
      <CursorGlow />
      <SiteHeader />
      <main>
        <Hero />
        <PhotoToStory />
        <BookMarquee />
        <Bento />
        <InsideGallery />
        <StoryShowcase />
        <SocialProof />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
