import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [location] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2); // Mock cart count

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center">
              <div className="text-primary font-['Playfair_Display'] text-3xl font-bold">Farmley</div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className={cn(
                  "font-['Poppins'] text-gray-800 hover:text-primary font-medium transition-colors",
                  location === link.href && "text-primary"
                )}>
                  {link.name}
                </a>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm w-60"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>

            {/* Mobile Search Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5 text-gray-700" />
            </Button>

            {/* User */}
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary">
              <User className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-[#E84C3D] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col h-full py-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-primary font-['Playfair_Display'] text-2xl font-bold">Farmley</h2>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col space-y-6">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <SheetClose asChild>
                          <a className={cn(
                            "font-['Poppins'] text-gray-800 hover:text-primary font-medium transition-colors",
                            location === link.href && "text-primary"
                          )}>
                            {link.name}
                          </a>
                        </SheetClose>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar (conditionally rendered) */}
        {isSearchOpen && (
          <div className="mt-3 md:hidden">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm w-full"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
