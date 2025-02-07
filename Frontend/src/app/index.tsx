import Link from "next/link";

const Header = () => (
  <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-4 sticky top-0 z-50 shadow-lg">
    <div className="container mx-auto flex justify-between items-center px-6">
      <Link href="/">
        <span className="text-2xl font-bold cursor-pointer">
          Vehicle Inspection
        </span>
      </Link>

      <nav className="flex space-x-4">
        <Link href="#Hero">
          <span className="hover:text-yellow-300 cursor-pointer">Home</span>
        </Link>
        <Link href="#About">
          <span className="hover:text-yellow-300 cursor-pointer">About</span>
        </Link>
        {/* <Link href="/Request-Inspection">
          <span className="hover:text-yellow-300 cursor-pointer">
            Request Inspection
          </span>
        </Link> */}
        <Link href="#contact">
          <span className="hover:text-yellow-300 cursor-pointer">Contact</span>
        </Link>
        <Link href="#FAQ">
          <span className="hover:text-yellow-300 cursor-pointer">Faq</span>
        </Link>
        {/* <Link href="/Customer_Login">
          <span className="hover:text-yellow-300 cursor-pointer">Login</span>
        </Link> */}
        {/* <Link href="/SignupInspector">
          <span className="hover:text-yellow-300 cursor-pointer">
            Inspector-Login
          </span>
        </Link> */}
      </nav>
    </div>
  </header>
);

export default Header;
