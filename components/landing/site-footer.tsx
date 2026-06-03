import { BookOpen } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-cream px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <div className="flex items-center justify-center gap-2 font-display text-lg font-semibold text-ink sm:justify-start">
            <BookOpen className="h-5 w-5 text-coral" />
            My Clever Pages
          </div>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            Personalized children&apos;s books where your little one is always
            the hero.
          </p>
        </div>
        <p className="text-sm text-ink-faint">
          Prototype concept · Built with care for the redesign assignment.
        </p>
      </div>
    </footer>
  );
}
