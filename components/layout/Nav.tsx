"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "backdrop-blur-md bg-[--color-bg]/80 border-b border-[--color-border]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8 h-16">
        <Link
          href="/"
          className="text-[--color-text] transition-opacity hover:opacity-80"
          aria-label={`${site.name} home`}
        >
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-[--color-text] hover:text-[--color-accent] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[--color-border] text-[--color-text] hover:text-[--color-accent] hover:border-[--color-accent] transition-colors"
            aria-label={`Call ${site.shortName} at ${site.phone}`}
          >
            <Icon name="phone" className="h-4 w-4" />
          </a>
          <Button href="/#book" size="md">
            Book
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
