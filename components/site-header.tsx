import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import ThemeToggle from "./theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-lg font-semibold transition-colors hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact
                </Link>
                <Link
                  href="/privacy"
                  className="text-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
            <span className="font-bold">ETB Exchange</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>
          </nav> */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
