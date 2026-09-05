"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState<boolean>(false);

  // Prevent auto‑close when clicking outside the sheet
  const handleInteractOutside = (e: any) => {
    const target = e.target as HTMLElement;
    if (target.closest('a')) {
      return;
    }
    e.preventDefault();
  };

  return (
    <nav className="sticky top-0 z-50 bg-emerald-950 shadow-sm">
      {/* FIRST ROW */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* APP LOGO */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-semibold tracking-tight text-white hover:text-emerald-100"
        >
          Stashmatic
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-3 md:gap-6">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button size="lg" className="gap-2">Login</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2">Register</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>

        {/* MOBILE Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button onClick={() => setOpen(true)}>
              <Menu size={24} className="text-white" />
            </button>
          </SheetTrigger>
          <SheetContent className="bg-emerald-950 [&_button]:text-white" onInteractOutside={handleInteractOutside}>
            <div className="flex flex-col items-center gap-4 mt-8">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <span className="text-lg text-white hover:text-emerald-200 cursor-pointer">Login</span>
                </SignInButton>
                <SignUpButton mode="modal">
                  <span className="text-lg text-white hover:text-emerald-200 cursor-pointer">Register</span>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>

              <hr className="w-full border-emerald-800 my-2" />

              <Link
                href="/trips"
                className="text-lg text-white hover:text-emerald-200"
                onClick={() => setOpen(false)}
              >
                Trips
              </Link>
              <Link
                href="/inventory"
                className="text-lg text-white hover:text-emerald-200"
                onClick={() => setOpen(false)}
              >
                Inventory
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        {/* DARK MODE TOGGLE: TODO */}
      </div>

      {/* SECOND ROW (Desktop Navigation) */}
      <div className="hidden md:flex border-t border-emerald-900 gap-6 px-6 py-3">
        <Link href="/trips" className="text-white hover:text-emerald-200">
          Trips
        </Link>
        <Link href="/inventory" className="text-white hover:text-emerald-200">
          Inventory
        </Link>
      </div>
    </nav>
  );
}
