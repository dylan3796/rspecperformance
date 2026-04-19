"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "backdrop-blur-md bg-[--color-bg]/80 border-b border-[--color-border]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8 h-16">
        <Link href="/" className="text-[--color-text] hover:text-[--color-accent] transition-colors" aria-label="RSpec Performance home">
          <Logo className="h-7 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {site.nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-[--color-accent]"
                    : "text-[--color-text] hover:text-[--color-accent]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" size="md">
            Book a consult
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-[--color-border] text-[--color-text]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[--color-border] bg-[--color-bg]">
          <div className="px-5 sm:px-6 py-4 flex flex-col gap-1">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="px-3 py-3 text-base font-medium text-[--color-text] hover:text-[--color-accent]"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" size="lg" className="mt-3" onClick={closeMenu}>
              Book a consult
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
