"use client"

import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Menu, X } from "lucide-react";

const navItems = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'map', href: '#map' },
  { key: 'hobbies', href: '#hobbies' },
  { key: 'achievements', href: '#achievements' },
  { key: 'works', href: '#works' },
];

function useNavHref(hash: string) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  return isHome ? hash : `/${hash}`;
}

export function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoHref = pathname === '/' ? '#home' : '/';

  return (
    <>
      {/* Main Navbar - Fixed and Transparent */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/90 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <a href={logoHref} className="flex items-center space-x-2">
              <span className={`font-bold text-xl transition-colors duration-300 ${
                scrolled 
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent' 
                  : 'text-white drop-shadow-lg'
              }`}>
                Yibu
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-between ml-8">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  item={item}
                  scrolled={scrolled}
                  onClick={() => setMobileMenuOpen(false)}
                />
              ))}
            </div>
            <div className="flex items-center space-x-1">
              <LanguageSwitcher 
                className={scrolled ? '' : 'text-white hover:bg-white/10 hover:text-white'}
                iconClassName={scrolled ? '' : 'drop-shadow-sm'}
              />
              <ThemeToggle 
                className={scrolled ? '' : 'text-white hover:bg-white/10 hover:text-white'}
                iconClassName={scrolled ? '' : 'drop-shadow-sm'}
              />
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex flex-1 items-center justify-end md:hidden">
            <LanguageSwitcher 
              className={scrolled ? '' : 'text-white hover:bg-white/10 hover:text-white'}
              iconClassName={scrolled ? '' : 'drop-shadow-sm'}
            />
            <ThemeToggle 
              className={scrolled ? '' : 'text-white hover:bg-white/10 hover:text-white'}
              iconClassName={scrolled ? '' : 'drop-shadow-sm'}
            />
            <Button
              variant="ghost"
              size="icon"
              className={`ml-1 ${scrolled ? '' : 'text-white hover:bg-white/10 hover:text-white'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu Content */}
          <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b shadow-lg">
            <div className="container mx-auto px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  item={item}
                  mobile
                  onClick={() => setMobileMenuOpen(false)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface NavLinkProps {
  item: { key: string; href: string };
  scrolled?: boolean;
  mobile?: boolean;
  onClick?: () => void;
}

function NavLink({ item, scrolled, mobile, onClick }: NavLinkProps) {
  const { t } = useTranslation();
  const href = useNavHref(item.href);

  const baseClasses = mobile
    ? 'block px-4 py-3 text-sm font-medium text-foreground/70 rounded-md hover:text-foreground hover:bg-accent transition-colors'
    : `px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
        scrolled
          ? 'text-foreground/70 hover:text-foreground hover:bg-accent'
          : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-sm'
      }`;

  return (
    <a href={href} className={baseClasses} onClick={onClick}>
      {t(`nav.${item.key}`)}
    </a>
  );
}
