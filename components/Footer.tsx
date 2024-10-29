import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Shipping Information
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          <p>&copy; 2024 ShoeStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
