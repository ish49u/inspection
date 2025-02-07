import Header from "../Navbar/page";
const Hero = () => (
  <>
    <Header />
    <section
      className="flex items-center justify-center text-white py-20 min-h-screen relative"
      style={{
        backgroundImage: 'url("/Images/main.jpg")', // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl font-bold mb-4">
          Reliable Vehicle Inspection Services at Your Fingertips
        </h1>
        <p className="mb-6 text-lg">
          Connecting you with professional inspectors to ensure fair insurance
          claims.
        </p>
        <a
          href="/Request-Inspection"
          className="bg-yellow-300 text-black px-6 py-2 rounded hover:bg-yellow-400"
        >
          Request an Inspection
        </a>
      </div>
    </section>
  </>
);

export default Hero;
