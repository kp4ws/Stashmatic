import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="">
      {/* HERO SECTION */}
      <header className="py-10 md:py-20 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
          Plan your pack like a <span className="text-green-400">pro</span>
        </h1>
        <p className="text-emerald-100 text-lg mb-8 max-w-xl text-center text-wrap">
          A structured gear planner for backpacking trips. Add your gear, build
          your loadout, know your weight.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* TODO: Add back in later */}
          {/* <Link href="/planner">
            <Button size="lg" className="gap-2">
              <Zap size={20} />
              Start building
            </Button>
          </Link> */}
        </div>
      </header>

      {/* TODO: FEATURES SECTION */}
      {/* <section>
        TODO: Features Section
      </section> */}

      {/* HOW IT WORKS SECTION */}

      {/* CALL TO ACTION SECTION */}

      {/* TESTIMONIALS SECTION */}
      
      <footer className="py-10 md:py-20 bg-emerald-950 text-white text-center">
        <p>&copy; 2026 Stashmatic. All rights reserved.</p>
      </footer>
    </div>
  );
}
