"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, User, Heart, Menu, LogIn, Package, LogOut, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Women", href: "/category/women" },
    { name: "Men", href: "/category/men" },
    { name: "Kids", href: "/category/kids" },
    { name: "Home & Kitchen", href: "/category/home" },
    { name: "Beauty", href: "/category/beauty" },
    { name: "Electronics", href: "/category/electronics" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild className="mr-2 md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="text-lg font-medium hover:text-primary">
                      {link.name}
                    </Link>
                  ))}
                  <div className="mt-auto pt-4 border-t">
                    {isAuthenticated ? (
                      <>
                        <Link href="/account" className="flex items-center gap-2 py-2">
                          <User className="h-5 w-5" />
                          <span>My Account</span>
                        </Link>
                        <Link href="/orders" className="flex items-center gap-2 py-2">
                          <Package className="h-5 w-5" />
                          <span>My Orders</span>
                        </Link>
                        <button
                          className="flex items-center gap-2 py-2 w-full text-left"
                          onClick={() => setIsAuthenticated(false)}
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <Link href="/login" className="flex items-center gap-2 py-2">
                        <LogIn className="h-5 w-5" />
                        <span>Login / Register</span>
                      </Link>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Meesho</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center w-full max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search for products, brands and more" className="w-full pl-9 pr-4" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}

            {isMobile && (
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}

            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  3
                </span>
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            {!isMobile && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {isAuthenticated ? (
                    <>
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/account">My Account</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders">My Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/wishlist">My Wishlist</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setIsAuthenticated(false)}>Logout</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/login">Login</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register">Register</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

