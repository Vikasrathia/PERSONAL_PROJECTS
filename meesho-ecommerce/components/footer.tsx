import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/women" className="text-muted-foreground hover:text-primary">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/category/men" className="text-muted-foreground hover:text-primary">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/category/kids" className="text-muted-foreground hover:text-primary">
                  Kids
                </Link>
              </li>
              <li>
                <Link href="/category/home" className="text-muted-foreground hover:text-primary">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link href="/category/beauty" className="text-muted-foreground hover:text-primary">
                  Beauty & Health
                </Link>
              </li>
              <li>
                <Link href="/category/electronics" className="text-muted-foreground hover:text-primary">
                  Electronics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-primary">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-primary">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-muted-foreground hover:text-primary">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">123 Commerce St, Anytown, AN 12345, Country</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">support@meesho.com</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <Input placeholder="Your email" className="max-w-[220px]" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2023 Meesho. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <img src="/placeholder.svg?height=30&width=50" alt="Visa" className="h-8" />
            <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" className="h-8" />
            <img src="/placeholder.svg?height=30&width=50" alt="PayPal" className="h-8" />
            <img src="/placeholder.svg?height=30&width=50" alt="Apple Pay" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  )
}

