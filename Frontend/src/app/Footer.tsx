const Footer = () => (
  <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto text-center">
      <p className="mb-2">
        &copy; 2024 Vehicle Inspection Services. All rights reserved.
      </p>
      <nav className="flex justify-center space-x-4">
        <a href="/privacy-policy" className="hover:text-yellow-300">
          Privacy Policy
        </a>
        <a href="/terms-and-conditions" className="hover:text-yellow-300">
          Terms and Conditions
        </a>
      </nav>
    </div>
  </footer>
);

export default Footer;
