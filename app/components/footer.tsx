"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-background py-6 text-sm text-muted-foreground">
      <div className="container mx-auto flex items-center justify-center gap-4">
        {" "}
        {/* Added container and flex */}
        <p>&copy; {currentYear} Callum Bir. All rights reserved.</p>
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </footer>
  );
}
