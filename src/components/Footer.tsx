import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">PeerFolio</h3>
            <p className="text-sm text-gray-600">
              A transparent platform for sharing experiences with professionals.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-sm text-gray-600 hover:text-primary">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-600 hover:text-primary">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-sm text-gray-600 hover:text-primary">
                  Content Guidelines
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-gray-600 hover:text-primary">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-sm text-gray-600 hover:text-primary">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} PeerFolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
